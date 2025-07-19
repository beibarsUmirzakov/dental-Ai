import React, { useState, useEffect } from 'react';
import './Patients.css';

function Patients() {
    const [patients, setPatients] = useState([]);

    const [diagnos, setDiagnos] = useState('');
    const [diagnosList, setDiagnosList] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        lastVisit: '',
        title: '',
        photo: 'фото'
    });

    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPatients([formData, ...patients]);
        setFormData({ name: '', birth: '', lastVisit: '', photo: 'фото' });
        setShowForm(false);
    };


      useEffect(() => {
      fetch('https://gist.githubusercontent.com/beibarsUmirzakov/a7fa7c1ff2d17b4a08e961260a90b514/raw/a8aacc49bc2922d0b703e2b43ce59b20ed1b62a5/gistfile1.txt') // update URL to match your backend
      .then(res => res.json())
      .then(data => {
        setPatients(data.allMeetings || []);
        setFormData(prev => ({
                            ...prev,
                            title: data.allMeetings.title || ''
                        }));
    })
      .catch(err => console.error('Error fetching appointments:', err));

      fetch('https://gist.githubusercontent.com/beibarsUmirzakov/d8c2c964ee3c21a5fd86c9beffc72ec7/raw/f613e9c1abee4caaddf3ac8ad66c18102b86a89a/gistfile1.txt') 
      .then(res => res.json())
      .then(data => {
        const diseases = data.items.filter(item => item.type === 'disease');
        setDiagnosList(diseases)
    })
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

    return (
        <div className="patients-page">
            <h1 className="page-title">Пациенты</h1>

            <div className="patients-actions">
                <button className="add-btn" onClick={() => setShowForm(true)}>Добавить пациента</button>
                <div className="search-block">
                    <input
                        type="text"
                        placeholder="Поиск пациента"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="patients-list">
                {patients
                    .filter(p => p.patient.toLowerCase().includes(search.toLowerCase()))
                    .map((p, i) => 

                        {
                        const dateStr = p.date;
                        const date = new Date(dateStr);
                        const formatter = new Intl.DateTimeFormat([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                        const formattedTime = isNaN(date.getTime()) ? p.date : formatter.format(date);

                        return(



                        <div className="patient-card" key={i}>
                            <div className="photo-block">{p.photo}</div>
                            <div className="info">
                                <strong>{p.patient}</strong>
                                <div>{p.birth}</div>
                            </div>
                            <div className="visit">{p.title} {formattedTime}</div>
                            <button className="open-btn">Открыть</button>
                        </div>
                        )
                        }

                    )}
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowForm(false)}>✖</button>
                        <h3>Добавить пациента</h3>
                        <form onSubmit={handleSubmit}>
                            <input name="name" placeholder="ФИО" value={formData.name} onChange={handleChange} required />
                            <input name="birth" placeholder="Дата рождения" value={formData.birth} onChange={handleChange} required />
                            <input name="lastVisit" placeholder="Дата посещения" value={formData.lastVisit} onChange={handleChange} required />
                            <select value={diagnos} onChange={(e) => setDiagnos(e.target.value)}>
                            <option value="">Выберите диагноз</option>
                                {diagnosList.map((item, index) => (
                             <option key={index} value={item.name}>
                                {item.name}
                            </option>
                                ))}
                        </select>
                            <button type="submit">Добавить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Patients;
