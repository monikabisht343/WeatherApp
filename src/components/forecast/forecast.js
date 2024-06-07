import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', ' Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

const Forecast = ({data}) =>{

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    console.log(forecastDays);
    return (
        <>
        <label className="title-track">Daily Forecast</label>
        <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) =>(
            <AccordionItem key={idx}><AccordionItemHeading>
                <AccordionItemButton>
                    <div className="daily-item">

                        <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}/>
                        <label className="day">{forecastDays[idx]}</label>
                        <label className="description">{item.weather[0].description}</label>
                        <label className="min-max">

                         {Math.round(item.main.temp_min)}°C
                         {Math.round(item.main.temp_max)}°C
                         
                         </label>

                        </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                
                <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                        <label>Pressure</label>
                        <label>{item.main.pressure}hPa</label>
                    </div>
                      
                
                    <div className="daily-details-grid-item">
                        <label>Humidity</label>
                        <label>{item.main.humidity}%</label>
                    </div>

                <div className="daily-details-grid-item">
                        <label>Clouds</label>
                        <label>{item.clouds.all}m/s</label>
                    </div>
                      
                    <div className="daily-details-grid-item">
                        <label>Wind Speed</label>
                        <label>{item.wind.speed}m/s</label>
                    </div>

                    <div className="daily-details-grid-item">
                        <label>Sea Level</label>
                        <label>{item.main.sea_level}m</label>
                    </div>

                    <div className="daily-details-grid-item">
                        <label>Feels Like</label>
                        <label>{Math.round(item.main.feels_like)}m</label>
                    </div>

                </div>
                
                
                </AccordionItemPanel></AccordionItem>
            
        ))}
        
        </Accordion>
        
        
        </>
    );
};
export default Forecast;


// import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
// import './forecast.css';


// const Forecast = ({ data }) => {
//     const forecastDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     return (
//         <div className="forecast-container">
//             <h2 className="forecast-title">Daily Forecast</h2>
//             <Accordion allowZeroExpanded>
//                 {data.list.slice(0, 7).map((item, idx) => (
//                     <AccordionItem key={idx}>
//                         <AccordionItemHeading>
//                             <AccordionItemButton>
//                                 <div className="daily-item">
//                                     <img alt="weather" className="weather-icon" src={`icons/${item.weather[0].icon}.png`} />
//                                     <div className="day-info">
//                                         <span className="day">{forecastDays[new Date(item.dt * 1000).getDay()]}</span>
//                                         <span className="description">{item.weather[0].description}</span>
//                                         <span className="temp">
//                                             {Math.round(item.main.temp_min)}°C - {Math.round(item.main.temp_max)}°C
//                                         </span>
//                                     </div>
//                                 </div>
//                             </AccordionItemButton>
//                         </AccordionItemHeading>
//                         <AccordionItemPanel>
//                             <div className="details-container">
//                                 <div className="detail-item">
//                                     <span className="label">Pressure:</span>
//                                     <span className="value">{item.main.pressure} hPa</span>
//                                 </div>
//                                 <div className="detail-item">
//                                     <span className="label">Humidity:</span>
//                                     <span className="value">{item.main.humidity}%</span>
//                                 </div>
//                                 <div className="detail-item">
//                                     <span className="label">Wind Speed:</span>
//                                     <span className="value">{item.wind.speed} m/s</span>
//                                 </div>
//                                 {/* Add more details as needed */}
//                             </div>
//                         </AccordionItemPanel>
//                     </AccordionItem>
//                 ))}
//             </Accordion>
//         </div>
//     );
// };

// export default Forecast;
