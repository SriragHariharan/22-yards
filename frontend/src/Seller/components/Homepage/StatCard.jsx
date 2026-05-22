export default function StatCard({ label, value, prefix = '', icon }) {
    const displayValue = value ?? '—';

    return (
        <div className="stat-card">
            <div className="stat-card__icon">
                <i className={`fas fa-${icon}`} />
            </div>
            <div className="stat-card__body">
                <p className="stat-card__value">
                    {prefix}{displayValue}
                </p>
                <p className="stat-card__label">{label}</p>
            </div>
        </div>
    );
}
