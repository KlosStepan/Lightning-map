import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
//import "./Dashboard.css";
import { Col, Container, Row, Table } from 'reactstrap';
import { auth, db, logout } from "./Firebase"
import { query, collection, getDocs, where } from "firebase/firestore";
//https://blog.logrocket.com/user-authentication-firebase-react-apps/
function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [myMerchants, setMyMerchants] = useState([]);
    const [eshopsCZ, setEshopsCZ] = useState([]);
    const navigate = useNavigate();
    const fetchUserName = async () => {
        /*try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }*/
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        //console.log(user) //user?.uid
        const owner = user?.uid
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
        const getMyEshopscz = async (db: any, owner: string) => {
            const eshopsczSnapshot: any = await getDocs(query(collection(db, 'eshops'), where('owner', '==', owner)));
            let eshopscz = []

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
        getMyMerchants(db, owner)
        getMyEshopscz(db, owner)
        //fetchUserName();
    }, [user, loading]);
    return (
        <>
            <style type="text/css">
                {`
                .boxed{
                    border: 1px solid gray;
                    margin: 2px;
                }
                `}
            </style>
            <Container>
                <Row>
                    <Col>
                        <div className="dashboard boxed">
                            <div className="dashboard__container">
                                <div>Logged in as <b>{user?.displayName}</b></div>
                                <div>{user?.email} / {user?.uid}</div>
                                <button className="dashboard__btn" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Places</h2>
                        <span className="boxed">+</span>
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
                                <tr>
                                    <td>moje provozovna 1</td>
                                    <td>place description 1</td>
                                    <td>80.1276, 67.1768</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>moje provozovna 2</td>
                                    <td>place description 2</td>
                                    <td>81.5276, 68.8562</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>moje provozovna 3</td>
                                    <td>place description 3</td>
                                    <td>82.3476, 69.5262</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>moje provozovna 4</td>
                                    <td>place description 4</td>
                                    <td>81.9476, 70.02628</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>moje provozovna 5</td>
                                    <td>place description 5</td>
                                    <td>80.8976, 69.6682</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h2>Eshops</h2>
                        <span className="boxed">+</span>
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
                                <tr>
                                    <td>muj eshop 1</td>
                                    <td>eshop pridany 1</td>
                                    <td>www.mujeshop1.cz</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>muj eshop 2</td>
                                    <td>eshop pridany 2</td>
                                    <td>www.mujeshop2.cz</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                                <tr>
                                    <td>muj eshop 3</td>
                                    <td>eshop pridany 3</td>
                                    <td>www.mujeshop3.cz</td>
                                    <td><span className="boxed">EDIT</span><span className="boxed">DEL</span></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container >
        </>
    );
}
export default Dashboard;