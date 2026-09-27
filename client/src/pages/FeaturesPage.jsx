import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  useEffect(() => {
    document.title = 'WasteConnect | Features & Intelligence';
  }, []);

  const features = [
    {
      id: '1',
      icon: 'bi-journal-check',
      name: '1. SMART DISPOSAL GUIDANCE',
      badge: 'Preparation Protocol',
      desc: 'Material-specific guidance for E-Waste, Hazardous, Glass, Organics, Plastics, and Bulk waste. Provides clear DOs, DON\'Ts, and contamination prevention guidelines before request creation.',
      points: [
        'Structured preparation rules (e.g. separate lithium batteries)',
        'Contamination prevention notes',
        'Direct link to pickup scheduling',
      ],
    },
    {
      id: '2',
      icon: 'bi-shield-exclamation',
      name: '2. EXPLAINABLE PRIORITY',
      badge: 'Rule-Based Intelligence',
      desc: 'Transparent priority scoring (LOW, MEDIUM, HIGH) computed server-side using material hazard levels, request volume, and keyword urgency rules (e.g. "leak", "urgent", "broken").',
      points: [
        'Transparent points calculation (e.g. +30 E-Waste, +20 Urgency)',
        'Human-readable explanation reasons list',
        'Priority filter for municipal collection queue',
      ],
    },
    {
      id: '3',
      icon: 'bi-geo-alt',
      name: '3. COLLECTION ZONES',
      badge: 'Sector Allocation',
      desc: 'Automatic geographic sector allocation (Zone A, Zone B, Zone C, Zone D / General) based on pickup address location, streamlining route queueing for collection crews.',
      points: [
        'Automatic zone assignment upon submission',
        'Zone-specific request filtering for admin operators',
        'Zone capacity & pending request counts',
      ],
    },
    {
      id: '4',
      icon: 'bi-layers-half',
      name: '4. SMART COLLECTION BATCHING',
      badge: 'Operational Efficiency',
      desc: 'Groups active non-terminal requests by collection zone and pickup date into organized collection batches, maximizing vehicle capacity and reducing transit emissions.',
      points: [
        'Date & zone grouping algorithm',
        'Excludes completed/cancelled requests automatically',
        'Batch urgency level classification (HIGH ATTENTION)',
      ],
    },
    {
      id: '5',
      icon: 'bi-tree',
      name: '5. ENVIRONMENTAL IMPACT',
      badge: 'Diverted Waste Analytics',
      desc: 'Calculates diverted waste weight (kg), completed collection counts, and municipal completion percentages to measure environmental recycling metrics.',
      points: [
        'Estimated weight diverted from landfills',
        'Completion rate percentage tracking',
        'Exportable statistics for municipal environmental audits',
      ],
    },
  ];

  return (
    <div className="fade-in-ui py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 max-w-800 mx-auto">
          <span className="badge bg-emerald bg-opacity-20 text-emerald border border-emerald border-opacity-30 px-3 py-1.5 rounded-pill mb-3 fw-semibold small">
            RULE-BASED INTELLIGENCE
          </span>
          <h1 className="fw-extrabold text-dark mb-3">Core Platform Capabilities</h1>
          <p className="lead text-secondary fs-6">
            Five core capabilities powering organized waste collection, explainable priority, and municipal collection analytics.
          </p>
        </div>

        {/* Feature Cards List */}
        <div className="row g-4 mb-5">
          {features.map((feat) => (
            <div key={feat.id} className="col-12">
              <div className="wc-card p-4 p-md-5 border-start border-4 border-emerald">
                <div className="row align-items-center gy-4">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="feature-icon-box mb-0">
                        <i className={`bi ${feat.icon}`}></i>
                      </div>
                      <div>
                        <h4 className="fw-bold text-dark mb-0">{feat.name}</h4>
                        <span className="badge bg-light text-dark border extra-small">{feat.badge}</span>
                      </div>
                    </div>
                    <p className="text-secondary small mb-3">{feat.desc}</p>
                    <div className="row g-2">
                      {feat.points.map((pt, i) => (
                        <div key={i} className="col-sm-6">
                          <div className="d-flex align-items-center gap-2 text-dark extra-small fw-medium">
                            <i className="bi bi-check-circle-fill text-emerald"></i>
                            <span>{pt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-4 text-center text-md-end">
                    <Link to="/requests/new" className="btn btn-outline-emerald btn-sm px-4 fw-semibold">
                      Use Capability <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="bg-dark-forest p-4 p-md-5 rounded-4 text-center text-white shadow">
          <h3 className="fw-bold mb-2">Experience WasteConnect Operations</h3>
          <p className="text-light opacity-90 small mb-4">Centralized waste collection management built for smart urban sustainability.</p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/requests/new" className="btn btn-emerald px-4 fw-semibold">
              Create Pickup Request
            </Link>
            <Link to="/contact" className="btn btn-outline-light px-4 fw-semibold">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
