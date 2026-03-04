import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './Subscription.module.css';

const Subscription = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('monthly');

    const handleSubscribe = () => {
        alert('¡Gracias por suscribirte! (Simulación de pago exitosa)');
        navigate('/dashboard');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Elige tu Plan de Aprendizaje 🚀</h1>
            <p className={styles.subtitle}>Desbloquea todos los juegos y niveles</p>

            <div className={styles.plansContainer}>
                {/* Monthly Plan */}
                <div
                    className={`${styles.plan} ${selectedPlan === 'monthly' ? styles.selected : ''}`}
                    onClick={() => setSelectedPlan('monthly')}
                >
                    <h2>Mensual</h2>
                    <div className={styles.price}>$9.99<span>/mes</span></div>
                    <ul className={styles.features}>
                        <li>✅ Acceso a todas las materias</li>
                        <li>✅ Sin publicidad</li>
                        <li>✅ Reportes de progreso</li>
                    </ul>
                    <Button
                        variant={selectedPlan === 'monthly' ? 'primary' : 'outline'}
                        onClick={handleSubscribe}
                        style={{ width: '100%' }}
                    >
                        Elegir Mensual
                    </Button>
                </div>

                {/* Yearly Plan */}
                <div
                    className={`${styles.plan} ${selectedPlan === 'yearly' ? styles.selected : ''}`}
                    onClick={() => setSelectedPlan('yearly')}
                >
                    <div className={styles.badge}>Mejor Valor</div>
                    <h2>Anual</h2>
                    <div className={styles.price}>$89.99<span>/año</span></div>
                    <p className={styles.saveText}>¡Ahorra 25%!</p>
                    <ul className={styles.features}>
                        <li>✅ Todo lo del plan mensual</li>
                        <li>✅ Diploma de finalización</li>
                        <li>✅ Regalo sorpresa (digital)</li>
                    </ul>
                    <Button
                        variant={selectedPlan === 'yearly' ? 'secondary' : 'outline'}
                        onClick={handleSubscribe}
                        style={{ width: '100%' }}
                    >
                        Elegir Anual
                    </Button>
                </div>
            </div>

            <Button variant="ghost" onClick={() => navigate('/dashboard')} style={{ marginTop: '2rem' }}>
                Volver al Dashboard (Prueba Gratis)
            </Button>
        </div>
    );
};

export default Subscription;
