class ReservationStatus {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

module.exports.statuses = {
    PENDING: new ReservationStatus('Pendiente', 0),
    PAID: new ReservationStatus('Paga', 1),
    FINISHED: new ReservationStatus('Finalizada', 2)
};

module.exports.ReservationStatus = ReservationStatus;