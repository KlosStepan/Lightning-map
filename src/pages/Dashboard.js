import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
//import "./Dashboard.css";
import { Col, Container, Row, Table } from 'reactstrap';
import { auth, db, logout } from "../components/Firebase"
import { query, collection, getDocs, where } from "firebase/firestore";
import { Pwnspinner } from 'pwnspinner';
//https://blog.logrocket.com/user-authentication-firebase-react-apps/
//TS
import IEshop from "../ts/IEeshop";
import IMechant from "../ts/IMerchant";
interface IEshopAdmin {
    id: String,
    data: IEshop
}
interface IMerchantAdmin {
    id: String,
    data: IMechant
}
function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [eshopsCZ, setEshopsCZ] = useState([]);
    const [myMerchants, setMyMerchants] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        //owner for my mechants & eshops
        const owner = user?.uid

        const getMyEshopscz = async (db: any, owner: string) => {
            const eshopsczSnapshot: any = await getDocs(query(collection(db, 'eshops'), where('owner', '==', owner)));
            let eshopscz: IEshopAdmin[] = []

            eshopsczSnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
                eshopscz.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            console.log("rewrapped eshopscz")
            console.log(eshopscz)
            setEshopsCZ(eshopscz)
        }
        const getMyMerchants = async (db: any, owner: string) => {
            const merchSnapshot = await getDocs(query(collection(db, 'merchants'), where('properties.owner', '==', owner)));
            let merchants = []

            merchSnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data())
                merchants.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            console.log("rewrapped merchants")
            console.log(merchants)
            setMyMerchants(merchants)
        }
        getMyEshopscz(db, owner)
        getMyMerchants(db, owner)
    }, [user, loading]);
    return (
        <>
            <style type="text/css">
                {`
                .boxed {
                    border: 1px solid gray;
                    margin: 2px;
                }
                .btnStyle {
                    padding: 6px 10px 6px 10px;
                    background-color: orange;
                    color: white !important;
                    font-size: 14px !important;
                    font-weight: bold;
                  }
                .ptHover:hover{
                    cursor: pointer;
                  }  
                `}
            </style>
            <Container>
                <Row>
                    <Col>
                        <div className="dashboard boxed">
                            <div className="dashboard__container">
                                {(!user)
                                    ? <Pwnspinner color="orange" thickness={10} />
                                    : <>
                                        <div>Logged in as <b>{user?.displayName}</b></div>
                                        <div>{user?.email} / {user?.uid}</div>
                                        {/*<button className="dashboard__btn" onClick={logout}>*/}
                                        <button className="boxed btnStyle ptHover" onClick={logout}>
                                            Logout
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Merchants</h2>
                        <hr />
                        <div>&nbsp;</div>
                        <span className="boxed btnStyle ptHover">+</span>
                        <div>&nbsp;</div>
                        <Table className="boxed">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>description</th>
                                    <th>place [x,y]</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (myMerchants.length !== 0)
                                        ? myMerchants.map((merch) => <tr key={merch.id}><td>{merch.data.properties.title}</td><td>{merch.data.properties.description}</td><td>{merch.data.geometry.coordinates[0]}/{merch.data.geometry.coordinates[1]}</td><td><span className="boxed btnStyle ptHover">EDIT</span><span className="boxed btnStyle ptHover">DEL</span></td></tr>)
                                        : <tr>not ok</tr>

                                }
                                {
                                    /*<tr>
                                            <td>dummy provozovna 1</td>
                                            <td>dummy place description 1</td>
                                            <td>80.1276, 67.1768</td>
                                            <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                    </tr>*/
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h2>Eshops</h2>
                        <hr />
                        <div>&nbsp;</div>
                        <span className="boxed btnStyle ptHover">+</span>
                        <div>&nbsp;</div>
                        <Table className="boxed">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>description</th>
                                    <th>url</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (eshopsCZ.length !== 0)
                                        ? eshopsCZ.map((eshop) => <tr key={eshop.id}><td>{eshop.data.name}</td><td>{eshop.data.description}</td><td>{eshop.data.url}</td><td><span className="boxed btnStyle ptHover">EDIT</span><span className="boxed btnStyle ptHover">DEL</span></td></tr>)
                                        : <tr>not ok</tr>

                                }
                                {
                                    /*<tr>
                                        <td>dummy eshop 1</td>
                                        <td>dummy pridany 1</td>
                                        <td>www.dummyeshop1.cz</td>
                                        <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                    </tr>*/
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container >
        </>
    );
}
export default Dashboard;