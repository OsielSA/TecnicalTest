import React, { useState, useEffect } from 'react';
import { API_URLS } from '../apiConfig';
import axios from 'axios';
import CatalogoCRUD from '../components/CatalogoCRUD';

const CatalogsPage = () => {

    return (
        <h1>
            <CatalogoCRUD />
        </h1>
    );
};

export default CatalogsPage;