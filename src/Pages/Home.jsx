import React from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import HomeSlider from '../Components/HomeSlider'
import ProductCategoryWrapper from '../Components/ProductCategoryWrapper'
import TopProducts from '../Components/TopProducts'

const Home = () => {
  return (
    <MasterLayout>
      <div className="page-content-wrapper">
        <HomeSlider />
        <ProductCategoryWrapper />
        <TopProducts />

        <div className="container">
          <div className="card discount-coupon-card border-0">
            <div className="card-body">
              <div className="coupon-text-wrap d-flex align-items-center p-3">
                <h5 className="text-white pe-3 mb-0">Get 15% <br /> discount</h5>
                <p className="text-white ps-3 mb-0">
                  Whatsapp or call <strong className="px-1">7896024584</strong> or visit our branches at Ambari, Uzanbazar, Chandmari.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  )
}

export default Home