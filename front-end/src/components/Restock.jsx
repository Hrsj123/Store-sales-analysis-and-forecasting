import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import * as const_api_endpoints from '../constants/api_endpoints'


const Restock = ({ product, storeNo, setshowRestockModal, inventoryData, setInventoryData }) => {
    const [restockInfo, setRestockInfo] = useState([])
    const [options, setOptions] = useState([]) 
    const [selectedIdx, setSelectedIdx] = useState('')
    const [restockQuantity, setRestockQuantity] = useState(0)

    const effectRan = useRef();
    // --------------------------
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    // --------------------------

    useEffect(() => {
        if (!effectRan.current) {
            getRestockInfo()
            return () => {
                effectRan.current = true;
            }
        }
    }, [])

    const handleRestockQuantity = (value) => {
        if (value > restockInfo[selectedIdx].quantity) {
            // Some warning should appear
        }
        setRestockQuantity(value)
    }

    const getRestockInfo = async () => {
        const queryParams = '?' + new URLSearchParams({ 'product-name': product, 'store-no': storeNo })
        await fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.restock + queryParams)
          .then(res => res.json())
          .then(data => {
            setRestockInfo([...data])
            setOptions([...data.map(ele => `Store: ${ele.store} => Quantity: ${ele.quantity}`)])
          })
          .catch(err => console.error(err));
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Should be post but lets keep it get!
        const queryParams = '?' + new URLSearchParams({ 
            'quantity': restockQuantity, 
            'from-store': restockInfo[selectedIdx].store,
            'to-store': storeNo,
            'product-name': product
        })
        
        fetch(const_api_endpoints.default.baseUrl + const_api_endpoints.default.restock_set + queryParams)
          .then(res => res.json())
          .then(data => {
            setRestockInfo([...data])
            setOptions([...data.map(ele => `Store: ${ele.store} => Quantity: ${ele.quantity}`)])
          })
          .catch(err => console.error(err));

        setInventoryData([
            ...inventoryData.map(element => {
                if (product === element.title) {
                    element.quantity = parseInt(element.quantity) + parseInt(restockQuantity)
                }
                return element
            })
        ])
        effectRan.current = false;
        setshowRestockModal(false)
        setRestockInfo([])
        setOptions([])
        setSelectedIdx('')
        setRestockQuantity(0)
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Restock</Modal.Title>
            </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className='mb-3'>
                            <DropdownButton
                                alignRight
                                title="Select an option"
                                open={isOpen}
                                onToggle={handleToggle}
                            >
                                {options.map((option, index) => (
                                    <Dropdown.Item key={index} onClick={() => setSelectedIdx(index)}>{option}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="number">Quantity</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="quantity" 
                                placeholder="Enter restock quantity" 
                                value={restockQuantity}
                                onChange={(e) => handleRestockQuantity(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>

            </Modal.Dialog>
        </div>
    )
}

export default Restock