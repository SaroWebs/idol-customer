import React, { useEffect, useState } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import PrescriptionUpload from '../Components/PrescriptionUpload'
import axios from 'axios';
import { API_HOST, STORAGE_PATH } from '../config/config';
import ShowPrescription from '../Components/ShowPrescription';
import { Link } from 'react-router-dom';

const Prescriptions = () => {
  const [prescGroup, setPrescGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    const token = localStorage.getItem('token');
    axios.get(`${API_HOST}/prescription/group/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setPrescGroup(response.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err.message);
      })
      .finally(() => {
        console.log('Data fetching completed.');
      });
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <MasterLayout title="Prescriptions">
      <div className="page-content-wrapper">
        <div className="blog-wrapper">
          <div className="container my-2">
            {prescGroup.length < 1 ?
              <div className="col-md-12">
                <div className="card coupon-card mb-3">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h2>No presciption found!</h2>
                  </div>
                </div>
              </div>
              : (
                <div className="row g-3">
                  {prescGroup.map((pgr, i) => (
                    <div key={i} className="col-6 col-md-4">
                      <div className="card blog-card d-flex relative overflow-hidden">
                        <div className="row g-2">
                          {pgr.prescriptions.map((prs, j) => (
                            <div key={j} className={`col-${pgr.prescriptions.length > 1 ? 6 : 12}`}>

                              <img
                                className="img-fluid"
                                src={STORAGE_PATH + '/' + prs.file_path}
                                alt="prescription"
                                style={{ maxWidth: '100%' }}
                                loading="lazy"
                              />

                            </div>
                          ))}
                        </div>
                        <ShowPrescription type="button" text='View' code={pgr.group_code} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

        <div className="d-flex justify-content-center my-4" style={{ width: '100%' }}>
          <PrescriptionUpload
            type='unassigned'
            text='Upload Prescription'
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            reload={getData}
          />
        </div>
      </div>
    </MasterLayout>
  )
}

export default Prescriptions