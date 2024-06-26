import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllTest from '../../Pages/Test/AllTest'
import AddTest from '../../Pages/Test/AddTest'
import EditTest from '../../Pages/Test/EditTest'
import AllPackageTitle from '../../Pages/PackageTitle/AllPackageTitle'
import AddPackageTitle from '../../Pages/PackageTitle/AddPackageTitle'
import EditPackageTitle from '../../Pages/PackageTitle/EditPackageTitle'
import AllTestCategory from '../../Pages/TestCategory/AllTestCategory'
import AddTestCategory from '../../Pages/TestCategory/AddTestCategory'
import EditTestCategory from '../../Pages/TestCategory/EditTestCategory'
import AllPackage from '../../Pages/Package/AllPackage'
import AddPackage from '../../Pages/Package/AddPackage'
import EditPackage from '../../Pages/Package/EditPackage'
import AddLaboratory from '../../Pages/Laboratory/AddLaboratory'


const Home = () => {
  return (
    <>
    
      <Header/>
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard/>}/>

          {/* Category --  */}
          <Route path={"/all-test"} element={<AllTest/>}/>
          <Route path={"/add-test"} element={<AddTest/>}/>
          <Route path={"/edit-test/:id"} element={<EditTest/>}/>

          {/* --- Package Title --- */}
          <Route path={"/all-package-title"} element={<AllPackageTitle/>}/>
          <Route path={"/add-package-title"} element={<AddPackageTitle/>}/>
          <Route path={"/edit-package-title/:id"} element={<EditPackageTitle/>}/>

          {/* --- Test Category --- */}
          <Route path={"/all-test-category"} element={<AllTestCategory/>}/>
          <Route path={"/add-test-category"} element={<AddTestCategory/>}/>
          <Route path={"/edit-test-category/:id"} element={<EditTestCategory/>}/>

          {/* --- Packages --- */}
          <Route path={"/all-package"} element={<AllPackage/>}/>
          <Route path={"/add-package"} element={<AddPackage/>}/>
          <Route path={"/edit-package/:id"} element={<EditPackage/>}/>

          {/* --- Laboratory --- */}
          {/* <Route path={"/all-package"} element={<AllPackage/>}/> */}
          <Route path={"/add-laboratory"} element={<AddLaboratory/>}/>
          {/* <Route path={"/edit-package/:id"} element={<EditPackage/>}/> */}

        </Routes>
      </div>

    </>
  )
}

export default Home