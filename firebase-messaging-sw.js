importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// Ganti dengan konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyB5MMnqL8RAidNzgrzXX3u6dep_wBW-Goo",
  projectId: "lms-instansi",
  messagingSenderId: "337951611123",
  appId: "1:337951611123:web:eaefe19b03d27eb01b3f86"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Menangani pesan yang masuk saat aplikasi berjalan di latar belakang (Background)
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Menerima pesan di background ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'icon-192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
