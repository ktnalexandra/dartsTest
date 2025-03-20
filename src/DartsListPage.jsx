import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const DartsListPage = () => {

    const[dartses,setDartses] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://darts.sulla.hu/darts")
            .then((res) => res.json())
            .then((data) => setDartses(data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border" role="status"></div>
            ) : (
                <div>
                    <p className="h1">Dartsozók</p>
                    {dartses.map((dartss, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="h5">Név: {dartss.name}</p>
                            <p className="text-danger">Születési éve: {dartss.birth_date}</p>
                            <p className="text-success">Megnyert világbajnokságok: {dartss.world_ch_won}</p>
                            <NavLink to={dartss.profile_url} target="_blank" name="Profile link"><button className='btn btn-success'>Profil link</button></NavLink><br />
                            <div className="card-body">
                                <NavLink key={dartss.id} to={"/darts/" + dartss.id}>
                                    <img alt={dartss.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={dartss.image_url ? dartss.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                
                            </div>
                            <div>
                                <Link to={`/del-darts/${dartss.id}`} className="justify-content-center align-item-center"><button className='btn btn-danger'><i className="bi bi-trash3 fs-3"></i></button></Link>&nbsp;&nbsp;&nbsp;
                                <Link to={`/mod-darts/${dartss.id}`} className="justify-content-center align-item-center"><button className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></button></Link>&nbsp;&nbsp;&nbsp;
                                <Link to={`/darts/${dartss.id}`} className="justify-content-center align-item-center"><button className='btn btn-primary'><i className="bi bi-text-paragraph fs-3"></i></button></Link>
                                </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}