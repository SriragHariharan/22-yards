import React from 'react'

export default function StarComponent({rating, count}) {
  return (
        <>
        {
            rating === 1 && (
                <div class="mb-2 me-2">
                    <i class="fa fa-star text-warning "></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <span className="ms-2 me-2 text-dark"><sub>
                            { count ? "("+ count +" user reviews)" : null}
                        </sub>
                    </span>
                </div>
            )
        }
        {
            rating === 2 && (
                <div class="mb-2 me-2">
                    <i class="fa fa-star text-warning "></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <span className="ms-2 me-2 text-dark"><sub>
                            { count ? "("+ count +" user reviews)" : null}
                        </sub>
                    </span>
                </div>
            )
        }
        {
            rating === 3 && (
                <div class="mb-2 me-2">
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <span className="ms-2 me-2 text-dark"><sub>
                            { count ? "("+ count +" user reviews)" : null}
                        </sub>
                    </span>
                </div>
            )
        }
        {
            rating === 4 && (
                <div class="mb-2 me-2">
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star" style={{color:'#868686'}}></i>
                    <span className="ms-2 me-2 text-dark"><sub>
                            { count ? "("+ count +" user reviews)" : null}
                        </sub>
                    </span>
                </div>
            )
        }
        {
            rating === 5 && (
                <div class="mb-2 me-2">
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <span className="ms-2 me-2 text-dark"><sub>
                            { count ? "("+ count +" user reviews)" : null}
                        </sub>
                    </span>
                </div>
            )
        }
        </>      
  )
}
