import './App.css';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'
import Register from './pages/register/Register.js';
import Login from './pages/login/Login.js';
import Home from './pages/home/Home.js';
import BindBankCard from './components/BindBankCard/BindBankCard.js';
import Invitation from './components/Invitation/Invitation.js';
import Bonus from './components/Bonus/Bonus.js';
import ProductPage from './components/ProductPage/ProductPage.js';
import SingleProduct from './components/SingleProduct/SingleProduct.js';
import MyProfile from './components/MyProfile/MyProfile.js';
import MyTeam from './components/MyTeam/MyTeam.js';
import { useEffect, useState } from 'react';
import ForgotPassword from './pages/forgotPassword/forgotPassword.js';
import Checkout from './pages/ckeckout/checkout.js';
import TransactionCompleted from './pages/transaction/transaction.js';
import PrivateRoute from './routes/privateRoutes.js';
import Dashboard from './pages/Admin/AdminDashbord/AdminDashbord.js';
import AllUsers from './pages/Admin/AllUsers/AllUsers.js';
import PaidUsers from './pages/Admin/PaidUsers/PaidUsers.js';
import UnpaidUsersList from './pages/Admin/UnpaidUserslist/UnpaidUserslist.js';
import BlockedUsers from './pages/Admin/BlockedUsers/BlockedUsers.js';
import DownlineUsers from './pages/Admin/DownlineUsers/DownlineUsers.js';
import ActivationReport from './pages/Admin/ActivationReport/ActivationReport.js';
import ActivateUserForm from './pages/Admin/ActivateUserForm/ActivateUserForm.js';
import AdminTransactions from './pages/Admin/AdminTransaction/AdminTransacion.js';
import AdminRoute from './routes/adminRoutes.js';
import AddProduct from './pages/Admin/AddProduct/AddProduct.js';
import AllProducts from './pages/Admin/AllProducts/AllProducts.js';
import UpdateProduct from './pages/Admin/UpdateProduct/UpdateProduct.js';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin.js';
import ContackManager from './pages/ContactMangager/contactManager.js';
import Recharge from './components/Recharge/Recharge.js';
import WeeklySalaryPoster from './components/WeeklySalaryPoster/WeeklySalaryPoster.js';
import EditUser from './pages/Admin/editUser/editUser.js';
import WithdrawalForm from './components/Withdrawl/Withdrawl.js';
import WithdrawlDummy from './pages/Admin/withdrawlDummy.js';
import Transaction from './components/Transaction/Transaction.js';
import AllRequestList from './pages/Admin/AllRequestList/AllRequestList'
import RechargeDummy from './pages/Admin/rechargeDummy.js';
import AddDeduct from './pages/Admin/AddDeduct.js/AddDeduct.js';
import MyProjects from './components/MyProjects/MyProjects.js';
import SpinGame from './components/spinGame/SpinGame.js';
import RocketGame from './components/RocketGame/RocketGame.js';
import AllWithdrawRequest from './pages/Admin/AllWithdrawRequest/AllWithdrawRequest.js';
import TotalEarnings from './components/TotalEarnings/TotalEarnings.js';
import BonusEarnings from './components/BonusEarnings/BonusEarnings.js';
import ReferralIncome from './components/ReferralIncome/ReferralIncome.js';
import TeamIncome from './components/TeamIncome/TeamIncome.js';
import GameBonus from './components/GameBonus/GameBonus.js';
import DailyIncome from './components/DailyIncome/DailyIncome.js';
import TermsAndConditions from './pages/term&conditios/term&conditions.js';
import DepositForm from './pages/coinPayments23.js';
import PaymentForm from './components/upiPayment/upiPaymentRequest.js';
import Payout from './components/payout/payout.js';
import Deposite from './components/Recharge/deposite.js';
import AllQrRequest from './pages/Admin/AllQrRequest/AllQrRequest.js';
function App() {

  return (
    <div className="">
      <div className="wrapper">
        <ScrollToTop/>
      <Routes>
      <Route path="/users" element={<PrivateRoute />}>
          <Route path="user" element={<MyProfile />} />
          <Route path="user/checkout" element={<Checkout />} />
          <Route path="user/withdrawl-dummy" element={<WithdrawlDummy />} />
          <Route path="user/recharge-dummy" element={<RechargeDummy />} />
          <Route path="user/recharge" element={<Deposite />} />
          <Route path="user/bindBankCard" element={<BindBankCard />} />
          <Route path="user/transaction" element={<TransactionCompleted />} />
          <Route path="user/all-transaction-details" element={<Transaction />} />
          <Route path="user/invitation" element={<Invitation />} />
          <Route path="user/bonus" element={<Bonus />} />
          <Route path="user/contact-manager" element={<ContackManager />} />
          <Route path="user/all-products" element={<ProductPage />} />
          <Route path="user/weekly-salary-info" element={<WeeklySalaryPoster/>} />
          <Route path="user/single-product" element={<SingleProduct />} />
          <Route path="user/my-team" element={<MyTeam />} />
          <Route path="user/my-products" element={<MyProjects />} />
          <Route path="user/forgot-password" element={<ForgotPassword />} />
          <Route path="user/modify-password" element={<ForgotPassword />} />
          <Route path="user/withdrawl" element={<WithdrawalForm />} />
          <Route path="user/make-payment" element={<BindBankCard />} />
          <Route path='user/spin-game' element={<SpinGame/>}/>
          <Route path='user/rocket-game' element={<RocketGame/>}/>
          <Route path='user/total-earnings' element={<TotalEarnings/>}/>
          <Route path='user/bonus-earnings' element={<BonusEarnings/>}/>
          <Route path='user/referral-income' element={<ReferralIncome/>}/>
          <Route path='user/team-income' element={<TeamIncome/>}/>
          <Route path='user/game-bonus' element={<GameBonus/>}/>
          <Route path='user/daily-income' element={<DailyIncome/>}/>
          <Route path='user/coin-deposite' element={<DepositForm/>}/>
          <Route path='user/upi-deposite' element={<PaymentForm/>}/>
          <Route path='user/qr-deposite' element={<Recharge/>}/>
          <Route path='user/payout' element={<Payout/>}/>
    </Route>
    <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/add-product" element={<AddProduct/>} />
          <Route path="admin/all-products" element={<AllProducts/>} />
          <Route path="admin/update-product/:id" element={<UpdateProduct/>} />
          <Route path="admin/all-users" element={<AllUsers />} />
          <Route path="admin/all-paid-users" element={<PaidUsers />} />
          <Route path="admin/all-requests" element={<AllRequestList />} />
          <Route path="admin/all-unpaid-users-list" element={<UnpaidUsersList />} />
          <Route path="admin/blocked-users" element={<BlockedUsers />} />
          <Route path="admin/downline-users" element={<DownlineUsers />} />
          <Route path='admin/add-deduct' element={<AddDeduct/>}/>
          <Route path="admin/activation-report" element={<ActivationReport />} />
          <Route path="admin/activate-user" element={<ActivateUserForm />} />
          <Route path="admin/transactions" element={<AdminTransactions />} />
          <Route path='admin/update-user' element={<EditUser/>}/>
          <Route path='admin/all-withdrawl-requests' element={<AllWithdrawRequest/>}/>
          <Route path='admin/all-qr-requests' element={<AllQrRequest/>}/>
      </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/terms-conditions" element={<TermsAndConditions/>} />
      </Routes>
    </div>
    </div>
  );
}

export default App
