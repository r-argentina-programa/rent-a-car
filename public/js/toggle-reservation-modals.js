const $modal = document.querySelector('.modal');
const $html = document.querySelector('html');
const $finishButtons = document.querySelectorAll('.finish-button');
const $unblockButtons = document.querySelectorAll('.unblock-button');
const $payButtons = document.querySelectorAll('.pay-button');
const $cancelButtons = $modal.querySelectorAll('.cancel-button');

const handleOpenModal = new Event('openModal', { bubbles: true });
const handleCloseModal = new Event('closeModal', { bubbles: true });

/**
 * @param {Event} evt
 */
function fillModal(evt) {
  const $modalTitle = $modal.querySelector('.modal-card-title');
  const $statusButton = $modal.querySelector('.status-button');
  const $modalContent = $modal.querySelector('.modal-content');
  const $modalForm = $modal.querySelector('.modal-form');
  const reservation = evt.target.closest('.reservation-data');
  const { id, status } = reservation.dataset;

  if (status == ReservationStatus.PENDING.value) {
    $modalTitle.textContent = 'Marcar reserva como paga';
    $statusButton.textContent = 'Marcar como paga';
    $modalContent.textContent = `Confirma marcar reserva ID ${id} como Paga?`;
    $modalForm.action = `/reservation/pay/${id}`;
  } else if (status == ReservationStatus.PAID.value) {
    $modalTitle.textContent = 'Finalizar reserva';
    $statusButton.textContent = 'Finalizar';
    $modalContent.textContent = `Confirma marcar reserva ID ${id} como Finalizada?`;
    $modalForm.action = `/reservation/finish/${id}`;
  } else if (status == ReservationStatus.FINISHED.value) {
    $modalTitle.textContent = 'Desbloquear reserva';
    $statusButton.textContent = 'Desbloquear';
    $modalContent.textContent = `Confirma marcar la reserva ID ${id} como Desbloqueada?`;
    $modalForm.action = `/reservation/unblock/${id}`;
  }
}

/**
 * @param {Event} event.target
 */
function clickAway({ target }) {
  if (target.classList.contains('modal-background')) target.dispatchEvent(handleCloseModal);
}

/**
 * @param {Event} event
 */
function escKey(event) {
  if (event.key === 'Escape') event.target.dispatchEvent(handleCloseModal);
}

/**
 * @param {Event} evt
 */
function openModal(evt) {
  evt.stopPropagation();
  fillModal(evt);
  $html.classList.add('is-clipped');
  $modal.classList.add('is-active');
  $html.addEventListener('click', clickAway);
  $html.addEventListener('keydown', escKey);
}

function closeModal() {
  $html.classList.remove('is-clipped');
  $modal.classList.remove('is-active');
  $html.removeEventListener('click', clickAway);
}

document.addEventListener('openModal', openModal);
document.addEventListener('closeModal', closeModal);

$finishButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$unblockButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$payButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$cancelButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleCloseModal))
);
