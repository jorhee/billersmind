import React from 'react';
import { Card, Table, ListGroup } from 'react-bootstrap';
import { FaUserMd, FaHospital, FaIdCard, FaCalendarAlt, FaFileMedical, FaCommentDots } from 'react-icons/fa';

function NoaPageCard({ noa }) {
    return (
        <Card className="m-3 p-3">
            <Card.Header>
                <h2><FaFileMedical /> NOA Details</h2>
            </Card.Header>
            <Card.Body>
                <Table bordered hover>
                    <tbody>
                        <tr>
                            <td><strong>Provider ID</strong></td>
                            <td>{noa.providerId}</td>
                        </tr>
                        <tr>
                            <td><strong>Patient ID</strong></td>
                            <td>{noa.patientId}</td>
                        </tr>
                        <tr>
                            <td><strong>Place of Service</strong></td>
                            <td>{noa.placeOfService || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Payer ID</strong></td>
                            <td>{noa.payerId}</td>
                        </tr>
                        <tr>
                            <td><strong>Member ID</strong></td>
                            <td>{noa.memberId}</td>
                        </tr>
                        <tr>
                            <td><strong>Admit Date</strong></td>
                            <td>{noa.admitDate}</td>
                        </tr>
                        <tr>
                            <td><strong>Type of Bill</strong></td>
                            <td>{noa.typeOfBill}</td>
                        </tr>
                        <tr>
                            <td><strong>Primary Diagnosis</strong></td>
                            <td>{noa.primaryDiagnosis}</td>
                        </tr>
                        <tr>
                            <td><strong>Status</strong></td>
                            <td>{noa.noaStatus}</td>
                        </tr>
                        <tr>
                            <td><strong>Sent Date</strong></td>
                            <td>{noa.sentDate || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Finalized Date</strong></td>
                            <td>{noa.finalizedDate || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Discharge Date</strong></td>
                            <td>{noa.dcDate || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Discharge Reason</strong></td>
                            <td>{noa.dcReason || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td><strong>Is NOA Late</strong></td>
                            <td>{noa.isNoaLate ? 'Yes' : 'No'}</td>
                        </tr>
                    </tbody>
                </Table>

                <h4 className="mt-4"><FaCalendarAlt /> Benefit Periods</h4>
                {noa.benefitPeriod.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Benefit #</th>
                                <th>Start Date</th>
                                <th>Term Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noa.benefitPeriod.map((benefit, index) => (
                                <tr key={index}>
                                    <td>{benefit.benefitNum}</td>
                                    <td>{benefit.BeneStartDate}</td>
                                    <td>{benefit.BeneTermDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No benefit periods available.</p>
                )}

                <h4 className="mt-4"><FaUserMd /> Attending Physician</h4>
                <ListGroup>
                    <ListGroup.Item><strong>Last Name:</strong> {noa.AttMd.lastName}</ListGroup.Item>
                    <ListGroup.Item><strong>First Name:</strong> {noa.AttMd.firstName}</ListGroup.Item>
                    <ListGroup.Item><strong>NPI:</strong> {noa.AttMd.npi}</ListGroup.Item>
                </ListGroup>

                <h4 className="mt-4"><FaCommentDots /> Comments</h4>
                {noa.comments.length > 0 ? (
                    <ListGroup>
                        {noa.comments.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                <p><strong>Remarks:</strong> {comment.remarks || 'N/A'}</p>
                                <p><strong>Actions:</strong> {comment.actions || 'N/A'}</p>
                                <p><strong>Status:</strong> {comment.status}</p>
                                <p><strong>User ID:</strong> {comment.userId}</p>
                                <p><strong>Date:</strong> {comment.date}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No comments available.</p>
                )}
            </Card.Body>
        </Card>
    );
}

export default NoaPageCard;
