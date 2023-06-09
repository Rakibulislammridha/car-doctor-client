import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const BookService = () => {
  const service = useLoaderData();
//   console.log(service);
  const { title, _id, price, img } = service;
  
  const {user} = useContext(AuthContext);

  const handleBookService = (event) =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
        customerName: name,
        email,
        date,
        img,
        service: title,
        service_id: _id,
        price: price,
    }
    console.log(booking);

    fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.insertedId){
            alert('Service Booked')
        }
    })

  }

  return (
    <div>
      <h2>Book Service: {title}</h2>
      <div className="card-body">
        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                placeholder=""
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                defaultValue={user?.email}
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                defaultValue={'$ '+ price}
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookService;
