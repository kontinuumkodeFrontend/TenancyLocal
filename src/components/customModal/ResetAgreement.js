import { useDispatch } from 'react-redux'
import { mdActions } from '../../store/modal-slice';
import Close from "../../assets/images/close.png";

const ResetAgreement = () => {
    const dispatch = useDispatch();

    const hideModalHandler = (e) => {
        e.preventDefault();
        dispatch(mdActions.hideModal());
    };

    return (
        <div className="custom-modal bg-after">
            <div className="modal_head border-after d-flex justify-content-center mb-4">
                <h5 className="text-h5">Reset Tenancy Agreement</h5>
                <button className="modal_close" onClick={hideModalHandler}>
                    <img src={Close} alt="img" />
                </button>
            </div>
            <div className="modal_body mt-5">
                <h4 className="text-h4">Are you sure to reset this tenancy agreement template to Default template?</h4>
            </div>
            <div className="modal_footer mt-4">
                <button className="btn_filled btn_sm mx-auto" onClick={hideModalHandler}>
                    Reset Template
                </button>
            </div>
        </div>
    )
}

export default ResetAgreement