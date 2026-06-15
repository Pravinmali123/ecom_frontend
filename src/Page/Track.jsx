import React from 'react'

function Track() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          
          <div className="flex flex-wrap -m-4 text-center">

            {/* Card 1 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 bg-gray-100 px-4 py-6 rounded-lg hover:shadow-xl transition">
                
                <svg className="text-pink-600 w-12 h-12 mb-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900">
                  Premium Tshirts
                </h2>

                <p className="leading-relaxed">
                  Our T-Shirts are 100% made of cotton.
                </p>

              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 bg-gray-100 px-4 py-6 rounded-lg hover:shadow-xl transition">

                <svg className="text-pink-600 w-12 h-12 mb-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6" />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900">
                  Free Shipping
                </h2>

                <p className="leading-relaxed">
                  We ship all over India for FREE.
                </p>

              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 bg-gray-100 px-4 py-6 rounded-lg hover:shadow-xl transition">

                <svg className="text-pink-600 w-12 h-12 mb-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <h2 className="title-font font-medium text-lg text-gray-900">
                  Exciting Offers
                </h2>

                <p className="leading-relaxed">
                  We provide amazing offers & discounts
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}

export default Track