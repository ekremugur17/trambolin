import React from "react";
import { Card } from "reactstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export const LoadingSpinner = (props) => (
  <Card style={{ opacity: .2, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 10000, left: 0, top: 0, width: '100%', height: '100%', backgroundColor: '#111' }}>
    <Loader
      type="MutatingDots"
      color="#42c0ef"
    />
  </Card>
)