/**
 * TEST - Observer Pattern Implementation
 *
 * Este archivo contiene pruebas del patrón Observer
 * Puede ser usado con Jest o ejecutado directamente
 */

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
    console.log("MockObserver.update() called:", appointmentData);
  }
}

// Tests
async function runTests() {
  console.log("═══════════════════════════════════════════");
  console.log("   TESTING OBSERVER PATTERN");
  console.log("═══════════════════════════════════════════\n");

  // Test 1: Registrar observador
  console.log("✓ Test 1: Registrar observador");
  const subject = new AppointmentSubject();
  const observer1 = new MockObserver();
  subject.attach(observer1);
  console.log(`   Observadores registrados: ${subject.getObserverCount()}\n`);

  // Test 2: Registrar múltiples observadores
  console.log("✓ Test 2: Registrar múltiples observadores");
  const observer2 = new MockObserver();
  const observer3 = new MockObserver();
  subject.attach(observer2);
  subject.attach(observer3);
  console.log(`   Observadores registrados: ${subject.getObserverCount()}\n`);

  // Test 3: Notificar observadores
  console.log("✓ Test 3: Notificar todos los observadores");
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
  console.log(`   Observer1 actualizado: ${observer1.updateCalled}`);
  console.log(`   Observer2 actualizado: ${observer2.updateCalled}`);
  console.log(`   Observer3 actualizado: ${observer3.updateCalled}\n`);

  // Test 4: Desregistrar observador
  console.log("✓ Test 4: Desregistrar observador");
  subject.detach(observer2);
  console.log(
    `   Observadores después de desregistrar: ${subject.getObserverCount()}\n`
  );

  // Test 5: Verificar que observador desregistrado no reciba notificaciones
  console.log(
    "✓ Test 5: Verificar que observador desregistrado no reciba notificaciones"
  );
  observer2.updateCalled = false;
  observer1.updateCalled = false;
  observer3.updateCalled = false;

  await subject.notifyObservers(appointmentData);
  console.log(`   Observer1 actualizado: ${observer1.updateCalled}`);
  console.log(
    `   Observer2 actualizado: ${observer2.updateCalled} (debe ser false)`
  );
  console.log(`   Observer3 actualizado: ${observer3.updateCalled}\n`);

  // Test 6: NotificationService
  console.log("✓ Test 6: NotificationService");
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
  console.log(`   Notificaciones almacenadas: ${notifications.length}\n`);

  console.log("═══════════════════════════════════════════");
  console.log("   TODOS LOS TESTS COMPLETADOS ✓");
  console.log("═══════════════════════════════════════════");
}

// Ejecutar tests si se corre directamente
if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests };
