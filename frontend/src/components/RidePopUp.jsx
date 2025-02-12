import React from "react";

const RidePopUp = ({
  setRidePanel,
  ridePanel,
  setconfirmRide,
  ride,
  setRide,
  confirmride
}) => {
  if (ridePanel) {
    return (
      <div
        className={`w-full  flex-col overflow-scroll ${
          ridePanel ? ` flex` : `hidden`
        }  `}
      >
        <span
          className="w-full flex justify-center"
          onClick={() => {
            setRidePanel(false);
          }}
        >
          <i className="ri-arrow-down-wide-fill text-3xl m-auto"></i>
        </span>
        <h1 className="text-2xl font-bold m-auto mb-6 ">New Ride request !</h1>
        <div className="flex justify-between items-center bg-yellow-400 rounded-lg p-2 w-full  ">
          <span className="flex gap-3 justify-center items-center">
            <img
              className="rounded-full object-cover w-16 h-16"
              src="https://media.istockphoto.com/id/523048762/photo/portrait-of-a-woman-outdoors-in-a-park.jpg?s=612x612&w=0&k=20&c=v7NpJMt8bs5ls7K9og1C43g8kAlBHiQwcS_I3rus3qc="
              alt=""
            />

            <br />
            <span className="text-slate-950 font-bold text-xl">
              {ride?.user?.fullname?.firstname +
                " " +
                ride?.user?.fullname?.lastname}
            </span>
          </span>
          <p className="text-xl font-bold "> 2.3 KM </p>
        </div>

        <div className="w-full  mb-4 flex flex-col  items-start gap-3 text-lg">
          <p className="border-b border-black mt-4 w-full  text-left">
            {" "}
            <i className="ri-map-pin-line mr-3 font-bold text-gray-950">
              {" "}
              Pickup :{" "}
            </i>{" "}
            <br />{" "}
            <span className="text-gray-600 capitalize font-bold text-lg">
              {ride?.pickup}
            </span>
          </p>
          <p className="border-b border-black mt-4 w-full text-left">
            {" "}
            <i className="ri-map-pin-line mr-3 font-bold text-gray-950">
              {" "}
              Destination :
            </i>
            <br />{" "}
            <span className="text-gray-600 capitalize font-bold text-lg">
              {ride?.destination}
            </span>
          </p>
          <p className="border-b border-black mt-4 w-full text-left">
            <i className="ri-wallet-3-line  mr-3 font-bold text-slate-950">
              {" "}
              Amount
            </i>{" "}
            <br />
            <span className="text-2xl font-bold text-slate-600">
              ₹{ride?.fare}{" "}
            </span>
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={() => {
              setconfirmRide(true);
         
              const ride = confirmride()
              
              
            }}
            className="mt-2 bg-emerald-700 text-white  text-base font-bold w-3/4 rounded-lg px-8 m-auto py-2"
          >
            Confirm Ride <i className="ri-e-bike-line text-xl"></i>
          </button>
          <button
            onClick={() => {
              setRidePanel(false);
            }}
            className="mt-2 bg-slate-800 text-white  text-base font-bold w-3/4 rounded-lg px-8 m-auto py-2"
          >
            Ignore Ride
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`w-full  flex-col gap-6  ${ridePanel ? ` flex` : `hidden`}  `}
    >
      no rides
    </div>
  );
};

export default RidePopUp;
