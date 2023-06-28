import React from 'react'
import ReactStars from "react-rating-stars-component";

export default function ReviewsCard({review}) {
    const ratingStars = {
        size: 30,
        value: review.productRating,
        edit: false
      };

      //convert mongodb date to real date
      let date = new Date(review.purchaseDate)
      date=date.toLocaleString('en-GB', { month: 'long', year:'numeric'})

    return (
        <section className=" text-center text-lg-start rounded mb-1" >
        <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-11">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-10 col-12 text-start">
                               <ReactStars {...ratingStars} />
                               <p className="text-muted fw-light">
                                    {review.productReview}
                                </p>
                                <span className="mb-2 text-muted"><strong>{review.userName}</strong></span>
                                <div>
                                    <span><small className='text-muted'>Verified purchase . {date}</small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>  )
}
