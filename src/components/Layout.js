import React from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Layout( {children}) {
  return (
    <>
      <div id="body" className="theme-amethyst">


        {/* <div className="page-loader-wrapper">
          <div className="loader">
            <div className="m-t-30"><img src="assets/images/icon.svg" width="40" height="40" alt="Mooli" /></div>
            <p>Please wait...</p>
          </div>
        </div> */}


       


        <div className="overlay"></div>

        <div id="wrapper">


          <Navbar />

          <Sidebar />



          {/* <div id="main-content">
            <div className="container-fluid">

              <div className="block-header">
                <div className="row clearfix">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <h1>Hi, Welcomeback!</h1>
                    <span>JustDo eCommerce Analytics,</span>
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12 text-lg-right">
                    <div className="d-flex align-items-center justify-content-lg-end mt-4 mt-lg-0 flex-wrap vivify pullUp delay-550">
                      <div className="border-right pr-4 mr-4 mb-2 mb-xl-0 hidden-xs">
                        <p className="text-muted mb-1">Purchases <span id="mini-bar-chart3" className="mini-bar-chart"></span></p>
                        <h5 className="mb-0">289</h5>
                      </div>
                      <div className="border-right pr-4 mr-4 mb-2 mb-xl-0">
                        <p className="text-muted mb-1">Today’s profit <span id="mini-bar-chart2" className="mini-bar-chart"></span></p>
                        <h5 className="mb-0">$541</h5>
                      </div>
                      <div className="mb-3 mb-xl-0">
                        <p className="text-muted mb-1">Balance <span id="mini-bar-chart1" className="mini-bar-chart"></span></p>
                        <h5 className="mb-0">$98M</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div> */}
 {children}
        </div>

      </div>

    </>
  );
}

export default Layout;
