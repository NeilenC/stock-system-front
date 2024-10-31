import { Modal } from "@mui/material";
import { ModalComponentProps } from "./modal-model";

const ModalBooking: React.FC<ModalComponentProps> = ({
    isOpen,
    handleClose,
    title,
    children,
    onSubmit,
    width = '500px',
    height = 'auto',
    hideActions = false,
    error
  }) => {
return (
<Modal
open={isOpen}
onClose={handleClose}
aria-labelledby="modal-title"
aria-describedby="modal-description">
    <>hola
    </>
</Modal>
)
}

export default ModalBooking;