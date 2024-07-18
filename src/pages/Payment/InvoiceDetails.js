import React, { useContext, useState } from "react";
import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import print_icon from "../../assets/images/print_icon.svg";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

const InvoiceDetails = () => {
  const { sidebar, setSidebar, Dark, setDark } = useContext(AppContext);
  const aninations = {
    initial: { opacity: 0, x: 400 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const { t, i18n } = useTranslation();

  // React To Print Start
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {}, []);

  const handleBeforePrint = React.useCallback(() => {}, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Invoice",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);
  // React To Print End
  return (
    <motion.div
      className={sidebar ? "taskMain " : "cx-active taskMain"}
      id="cx-main"
      variants={aninations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div id="cx-wrapper">
        <div className="main-master-wrapper">
          <div className="all-vehical-head row">
            <div className="col-lg-10 row innerInputsGen">
              <p className="invoice-heading">{t("Invoice Details")}</p>
            </div>
            <div className="col-lg-2 export-btn">
              <button className="cx-btn-3" onClick={handlePrint}>
                <img src={print_icon} alt="" className="me-1" /> {t("Print")}
              </button>
            </div>
          </div>
          <div className="invoice-outer-wrapper" ref={componentRef} text={text}>
            <div className="invoice-inner-wrapper">
              <table className="heading-table">
                <tbody>
                  <tr className="left-title">
                    <td className="lt-heading">Invoice</td>
                    <td className="right-invoice-details">
                      <table>
                        <tr>
                          <td>Invoice No.</td>
                          <td>XYZ123456</td>
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td>29/09/2022</td>
                        </tr>
                        <tr>
                          <td>Due Date</td>
                          <td>09/10/2022</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="invoice-head">
                <tbody>
                  <tr className="address-row">
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>To,</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Mr. John Doe <br />
                              445 5th Avenue, New York, NY, USA <br />
                              +91 999 999 9999 <br />
                              john@gmail.com
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>From,</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Mr. John Doe <br />
                              445 5th Avenue, New York, NY, USA <br />
                              +91 999 999 9999 <br />
                              john@gmail.com
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="address-row">
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>GST / VAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>8956142364</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>GST / VAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>45678912345678</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="address-row">
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>Identification Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>8956142364</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="address-table">
                        <thead>
                          <tr>
                            <th>Payment Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Online</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8}>
                      <table className="particular-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name Of Particular</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Basic Amount</th>
                            <th>GST</th>
                            <th>Tax Amount</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="total">1</td>
                            <td>Service</td>
                            <td>10</td>
                            <td>$100</td>
                            <td>$1000</td>
                            <td>18%</td>
                            <td>$180</td>
                            <td>$1180</td>
                          </tr>
                          <tr>
                            <td colSpan={4}></td>
                            <td className="total">Total</td>
                            <td className="text-center">18%</td>
                            <td className="text-right">$180</td>
                            <td className="total">$1180</td>
                          </tr>
                          <tr className="pt-bottom-section">
                            <td colSpan={5}></td>
                            <td className="ptb-total">Net Payable</td>
                            <td className="ptb-total"></td>
                            <td className="ptb-total ptb-border-radius-bottom-right">
                              $1180
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8}>
                      <p className="tax-heading">Tax Break Ups</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8}>
                      <table className="particular-table tax-table">
                        <thead>
                          <tr>
                            <th>Rate</th>
                            <th>Basic</th>
                            <th>IGST</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>18%</td>
                            <td>10</td>
                            <td>&#8377; 0.0</td>
                            <td>9%</td>
                            <td>9%</td>
                            <td>$180</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="address-row">
                    <td>
                      <table className="description-table">
                        <thead>
                          <tr>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Enter Description on the Payment Receipt here...
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default InvoiceDetails;
