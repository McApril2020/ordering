import { useState, useEffect } from 'react';
import '../CSS/Alert.css';

function Alert({alert}) {
    const [message, setMessage] = useState('');
    const [a_type, setType] = useState('');
    const [color, setColor] = useState('');
    const [isCalled, setCalled] = useState(false)
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if(Object.keys(alert).length > 0) {
            setCalled(true)
            const {type, message} = alert

            setType(type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Error');
            setColor(type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'red');
            setIcon(type === 'success' ? 'fa fa-check' : type === 'warning' ? 'fa fa-exclamation-triangle' : 'fa fa-exclamation')
            setMessage(message);
            
            setTimeout(() => {
                setCalled(false)
            }, 3000)
        }
        
    }, [alert])

    return(
        <>
            <div className="alert-container">
                {isCalled && (
                    <div className="card">
                        <div className="icon-container">
                            <i className={icon} aria-hidden="true" style={{color: color}}></i>
                        </div>
                        <div className="message-text-container">
                            <p className="message-text" style={{color: color}}>{a_type}</p>
                            <p className="sub-text">{message}</p>
                        </div>
                        <div>
                            <button className="alert-button" onClick={() => {
                                setCalled(false)
                            }}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Alert;