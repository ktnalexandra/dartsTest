import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const DartsMod = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();
    const [darts, setDarts] = useState({
        name: "",
        birth_date: "",
        world_ch_won: 0,
        profile_url: "",
        image_url: "",
    });

    useEffect(() => {
        const fetchDartsData = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
                setDarts(response.data);
            } catch (error) {
                console.error("Error fetching darts data:", error);
            }
        };
        fetchDartsData();
    }, [dartsId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDarts((prevState) => ({
            ...prevState,
            [name]: name === "world_ch_won" ? Number(value) : value, // Convert to number if needed
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://darts.sulla.hu/darts/${dartsId}`, darts);
            navigate("/");
        } catch (error) {
            console.error("Error updating darts data:", error);
        }
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy dartsozó módosítása</h2>
            <form onSubmit={handleSubmit} data-testid="form">
                <div className="form-group row pb-3">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Dartsozó név:</label>
                    <div className="col-sm-9">
                        <input id="name" className="form-control" name="name" type="text" value={darts.name} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="birth_date" className="col-sm-3 col-form-label">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input id="birth_date" className="form-control" name="birth_date" type="date" value={darts.birth_date} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="world_ch_won" className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input id="world_ch_won" className="form-control" name="world_ch_won" type="number" value={darts.world_ch_won} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="profile_url" className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input id="profile_url" className="form-control" name="profile_url" type="text" value={darts.profile_url} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="image_url" className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input id="image_url" className="form-control" name="image_url" type="text" value={darts.image_url} onChange={handleInputChange} />
                        <br />
                        <img alt={darts.name} height="200px" src={darts.image_url} />
                    </div>
                </div>

                <button className="btn btn-success" type="submit">Küldés</button>
            </form>
        </div>
    );
};
