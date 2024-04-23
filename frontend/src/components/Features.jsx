import React from 'react';
import data from "../data/features.json"

const Features = () => {
    return (
        <div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {data.map((features, index) => {
                    return (
                        <div className="feature-item" key={index}>
                            <img src={features.image} alt={features.alt} className="feature-icon" />
                            <h3 className="feature-item-title">{features.title}</h3>
                            <p>{features.description}</p>
                        </div>
                    );
                })}
            </section>            
        </div>
    );
};

export default Features;