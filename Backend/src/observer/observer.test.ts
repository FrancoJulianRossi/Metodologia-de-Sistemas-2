import { AppointmentSubject } from "./appointment.subject";
import { Observer } from "./observer.interface";
import { NotificationService } from "../services/notification.service";

// Mock Observer para testing
class MockObserver implements Observer {
  public updateCalled = false;
  public lastData: any = null;

  async update(appointmentData: any): Promise<void> {
    this.updateCalled = true;
    this.lastData = appointmentData;
  }
}

describe("Observer Pattern Tests", () => {
  let subject: AppointmentSubject;
  let observer1: MockObserver;
  let observer2: MockObserver;
  let observer3: MockObserver;

  beforeEach(() => {
    subject = new AppointmentSubject();
    observer1 = new MockObserver();
    observer2 = new MockObserver();
    observer3 = new MockObserver();
  });

  test("should register a single observer", () => {
    subject.attach(observer1);
    expect(subject.getObserverCount()).toBe(1);
  });

  test("should register multiple observers", () => {
    subject.attach(observer1);
    subject.attach(observer2);
    subject.attach(observer3);
    expect(subject.getObserverCount()).toBe(3);
  });

  test("should notify all observers when data changes", async () => {
    subject.attach(observer1);
    subject.attach(observer2);
    subject.attach(observer3);

    const appointmentData = {
      id: 1,
      date: "2024-12-15",
      time: "14:00",
      status: "confirmed",
      id_patient: 1,
      id_medic: 2,
      changeType: "confirmed",
    };

    await subject.notifyObservers(appointmentData);

    expect(observer1.updateCalled).toBe(true);
    expect(observer2.updateCalled).toBe(true);
    expect(observer3.updateCalled).toBe(true);
  });

  test("should detach an observer", () => {
    subject.attach(observer1);
    subject.attach(observer2);
    subject.attach(observer3);
    subject.detach(observer2);
    expect(subject.getObserverCount()).toBe(2);
  });

  test("should not notify detached observer", async () => {
    subject.attach(observer1);
    subject.attach(observer2);
    subject.attach(observer3);
    subject.detach(observer2);

    const appointmentData = {
      id: 1,
      date: "2024-12-15",
      time: "14:00",
      status: "confirmed",
      id_patient: 1,
      id_medic: 2,
      changeType: "confirmed",
    };

    await subject.notifyObservers(appointmentData);

    expect(observer1.updateCalled).toBe(true);
    expect(observer2.updateCalled).toBe(false);
    expect(observer3.updateCalled).toBe(true);
  });

  test("should send notifications with NotificationService", async () => {
    const notificationService = new NotificationService();

    await notificationService.sendNotification({
      userId: 1,
      userType: "patient",
      title: "Test Notification",
      message: "Este es un mensaje de prueba",
      appointmentId: 1,
      changeType: "test",
    });

    const notifications = notificationService.getAllNotifications();
    expect(notifications.length).toBeGreaterThan(0);
  });

  test("should notify when appointment status changes to confirmed and log to console", async () => {
    const notificationService = new NotificationService();
    const consoleSpy = jest.spyOn(console, "log");

    subject.attach(observer1);
    subject.attach(observer2);

    const appointmentData = {
      id: 1,
      date: "2024-12-15",
      time: "14:00",
      status: "confirmed",
      id_patient: 1,
      id_medic: 2,
      changeType: "confirmed",
    };

    // Simular cambio de estado a confirmed
    await subject.notifyObservers(appointmentData);

    // Enviar notificación
    await notificationService.sendNotification({
      userId: appointmentData.id_patient,
      userType: "patient",
      title: "Cita Confirmada",
      message: `Tu cita ha sido confirmada para el ${appointmentData.date} a las ${appointmentData.time}`,
      appointmentId: appointmentData.id,
      changeType: "confirmed",
    });

    // Verificar que los observadores fueron notificados
    expect(observer1.updateCalled).toBe(true);
    expect(observer2.updateCalled).toBe(true);

    // Verificar que el cambio de estado se mostró por consola
    const consoleLogs = consoleSpy.mock.calls.flat().join(" ");
    expect(consoleLogs).toContain("confirmed");

    // Verificar que la notificación fue enviada
    const notifications = notificationService.getAllNotifications();
    expect(notifications.length).toBeGreaterThan(0);

    consoleSpy.mockRestore();
  });

  test("should notify when appointment status changes to cancelled and log to console", async () => {
    const notificationService = new NotificationService();
    const consoleSpy = jest.spyOn(console, "log");

    subject.attach(observer1);

    const appointmentData = {
      id: 2,
      date: "2024-12-20",
      time: "10:00",
      status: "cancelled",
      id_patient: 5,
      id_medic: 3,
      changeType: "cancelled",
    };

    // Simular cambio de estado a cancelled
    await subject.notifyObservers(appointmentData);

    // Enviar notificación
    await notificationService.sendNotification({
      userId: appointmentData.id_patient,
      userType: "patient",
      title: "Cita Cancelada",
      message: `Tu cita del ${appointmentData.date} a las ${appointmentData.time} ha sido cancelada`,
      appointmentId: appointmentData.id,
      changeType: "cancelled",
    });

    // Verificar que el observador fue notificado
    expect(observer1.updateCalled).toBe(true);

    // Verificar que los datos recibidos son correctos
    expect(observer1.lastData.changeType).toBe("cancelled");
    expect(observer1.lastData.status).toBe("cancelled");

    // Verificar que el cambio de estado se mostró por consola
    const consoleLogs = consoleSpy.mock.calls.flat().join(" ");
    expect(consoleLogs).toContain("cancelled");

    // Verificar que la notificación fue enviada
    const notifications = notificationService.getAllNotifications();
    expect(notifications.length).toBeGreaterThan(0);

    consoleSpy.mockRestore();
  });
});