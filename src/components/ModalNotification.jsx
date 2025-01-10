import Swal from "sweetalert2";
import { useBlogContext } from "../context/BlogContext";

const ModalNotification = () => {
  const { modalIsOpen, setModalIsOpen } = useBlogContext();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Trigger SweetAlert notification when the modal is open
  if (modalIsOpen) {
    Swal.fire({
      title: "Blog Updated",
      text: "Blog updated successfully!",
      icon: "success",
      confirmButtonText: "Close",
      confirmButtonColor: "#43c6ac",
    }).then(() => {
      closeModal();
    });
  }

  return null;
};

export default ModalNotification;
