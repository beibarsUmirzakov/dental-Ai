import React, { useState, useEffect } from 'react';
import './appointments.css';

export default function Appointments() {
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ time: '', name: '', surname: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [diagnos, setDiagnos] = useState('');
    const [diagnosList, setDiagnosList] = useState([]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addRecord = () => {
        if (!form.time || !form.name || !form.surname) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        const fullName = `${form.name} ${form.surname}`;
        setRecords([...records, { time: form.time, patient: fullName, procedure: 'Пломбирование', status: 'Подтвержден' }]);
        setForm({ time: '', name: '', surname: '' });
        setShowModal(false);
    };

    const filteredRecords = records.filter(rec =>
        rec.patient?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch('https://gist.githubusercontent.com/beibarsUmirzakov/a7fa7c1ff2d17b4a08e961260a90b514/raw/a8aacc49bc2922d0b703e2b43ce59b20ed1b62a5/gistfile1.txt')
            .then(res => res.json())
            .then(data => {
                setRecords(data.allMeetings || []);
            })
            .catch(err => console.error('Error fetching appointments:', err));

        fetch('https://gist.githubusercontent.com/beibarsUmirzakov/d8c2c964ee3c21a5fd86c9beffc72ec7/raw/f613e9c1abee4caaddf3ac8ad66c18102b86a89a/gistfile1.txt')
            .then(res => res.json())
            .then(data => {
                const diseases = data.items.filter(item => item.type === 'disease');
                setDiagnosList(diseases);
            })
            .catch(err => console.error('Error fetching diagnoses:', err));
    }, []);

    return (
        <div className="app-container">
            <div className="content-wrapper">
                <h2 className="title">Записи</h2>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Поиск по имени или фамилии"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => setSearchTerm('')}>Сбросить</button>
                </div>

                <table className="records-table">
                    <thead>
                    <tr>
                        <th>Время</th>
                        <th>Пациент</th>
                        <th>Процедура</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((rec, index) => (
                            <tr key={index}>
                                <td>{rec.time || rec.date}</td>
                                <td>{rec.patient}</td>
                                <td>{rec.title || rec.procedure}</td>
                                <td className="status-link">{rec.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Нет записей</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <button className="open-modal-button" onClick={() => setShowModal(true)}>
                    Добавить запись
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowModal(false)}>×</button>
                        <h3>Добавить запись</h3>
                        <input
                            type="text"
                            name="time"
                            placeholder="Время (например, 10:00)"
                            value={form.time}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя"
                            value={form.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Фамилия"
                            value={form.surname}
                            onChange={handleInputChange}
                        />
                        <select value={diagnos} onChange={(e) => setDiagnos(e.target.value)}>
                            <option value="">Выберите диагноз</option>
                            {diagnosList.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <button className="add-button" onClick={addRecord}>Добавить</button>
                    </div>
                </div>
            )}
        </div>
    );
}
