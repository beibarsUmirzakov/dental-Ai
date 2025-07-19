import React, { useState } from 'react';
import './doctors.css';

export default function Doctors() {
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            photo: null, // сюда можно URL фото
            fullName: 'Айбек уулу Азат',
            phone: '+996 700 123456',
            specialty: 'Терапевт',
        },
        // можно добавить еще врачей
    ]);

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ fullName: '', phone: '', specialty: '' });

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addDoctor = () => {
        if (!form.fullName || !form.phone || !form.specialty) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        const newDoctor = {
            id: Date.now(),
            photo: null,
            fullName: form.fullName,
            phone: form.phone,
            specialty: form.specialty,
        };
        setDoctors([...doctors, newDoctor]);
        setForm({ fullName: '', phone: '', specialty: '' });
        setShowModal(false);
    };

    return (
        <div className="doctors-container">
            <h1 className="page-title">Врачи</h1>
            <h3 className="subtitle">Список врачей клиники</h3>

            <div className="doctors-list">
                {doctors.map((doc) => (
                    <div key={doc.id} className="doctor-card">
                        <div className="photo-placeholder">
                            {/* Пока просто круглая заглушка */}
                            {!doc.photo && <div className="photo-circle" />}
                            {/* Если будет фото, можно показать: <img src={doc.photo} alt={doc.fullName} className="photo-circle" /> */}
                        </div>

                        <div className="doctor-info">
                            <div className="doctor-name">{doc.fullName}</div>
                            <div className="doctor-phone">{doc.phone}</div>
                            <div className="doctor-specialty">{doc.specialty}</div>
                        </div>

                        <button className="settings-button">Настроить</button>
                    </div>
                ))}
            </div>

            <button className="add-doctor-button" onClick={() => setShowModal(true)}>
                Добавить врача
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowModal(false)}>×</button>
                        <h3>Добавить врача</h3>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="ФИО врача"
                            value={form.fullName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Телефон"
                            value={form.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="specialty"
                            placeholder="Специальность"
                            value={form.specialty}
                            onChange={handleInputChange}
                        />
                        <button className="add-button" onClick={addDoctor}>Добавить</button>
                    </div>
                </div>
            )}
        </div>
    );
}
