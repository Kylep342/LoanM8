import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { createMonthlyPayment } from "../creators/monthlyPaymentCreator";

import "./style.css";

interface IProps { }