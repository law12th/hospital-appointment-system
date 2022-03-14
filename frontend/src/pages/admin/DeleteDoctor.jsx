import { useState } from "react";
import { CustomModal } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteDoctor = (props) => {
  const [isShowing, setIsShowing] = useState(false);

  const onOpen = () => {
    setIsShowing(true);
  };

  const onClose = () => {
    setIsShowing(false);
  };

  const onDelete = async () => {
    await axios
      .post("http://localhost:5000/api/admin/manage/delete-doctor", {
        doctor_id: props.id,
      })
      .then(() => {
        toast.success("Doctor Removed", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-outline-danger" onClick={onOpen}>
          <i className="bi bi-trash" />
        </button>
        {
          <CustomModal
            title="Confirm Delete"
            onClose={onClose}
            isShowing={isShowing}
            setIsShowing={setIsShowing}
          >
            <div>
              <button
                type="button"
                onClick={onDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-primary"
              >
                Cancel
              </button>
            </div>
          </CustomModal>
        }
      </div>
    </>
  );
};

export default DeleteDoctor;
