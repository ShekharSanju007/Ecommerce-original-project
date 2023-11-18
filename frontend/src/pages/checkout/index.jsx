import "./index.css"
import { useState } from "react"
function Checkout() {

    const [address, setAddress] = useState({
        "street": "",
        "city": "",
        "pincode": "",
        "state": "",
        "country": ""
    })
    const [showAddress, setshowAddress] = useState(false)

    return (
        <div className="checkout-container">
            <div className="address-header">
                <div className="title">
                    Delivery Address
                </div>
            </div>
            <div className="address-content">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="address" id="address1" checked/>
                    <label class="form-check-label" for="address1">
                       <div className="address">
                            Address 1
                       </div>
                    </label>
                </div>

                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="address" id="address2" />
                    <label class="form-check-label" for="address2">
                    <div className="address">
                            Address 2
                       </div>
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="address" id="address3" />
                    <label class="form-check-label" for="address3">
                    <div className="address">
                            Address 3
                       </div>
                    </label>
                </div>
            </div>
            <div className="add-address">
                {!showAddress && <div className="add-button">
                    <button className="btn btn-light" onClick={() => setshowAddress((p) => !p)}>Add Address</button>
                </div>}
                {showAddress &&
                    <>
                        <div className="input-address mt-5 ">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text">Street</span>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text">City</span>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text">State</span>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text">Country</span>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text">PinCode</span>
                                <input type="text" class="form-control" />
                            </div>
                            <button className="btn btn-light">Add Address</button>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Checkout