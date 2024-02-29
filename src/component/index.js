import { useEffect, useState } from "react";

export default function SchoolList() {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSchoolData(url) {
      const res = await fetch(
        "https://data.cityofnewyork.us/resource/s3k6-pzi2.json"
      );
      const data = await res.json();

      if (data) {
        try {
          setSchools(data);
          setLoading(true);
        } catch (err) {
          console.log("err:" + err);
        }
      }
    }
    fetchSchoolData();
  }, []);

  function handleSchool(dbn) {
    console.log(dbn);
    setSchool(schools.find((s) => s.dbn === dbn));
  }

  return (
    <div>
      <div className="school-container">
        <h2> School Information </h2>
        {Object.keys(school).length > 0 && (
          <div>
            <h4>
              ${school.school_name}, ${school.dbn}
            </h4>
          </div>
        )}

        <section>
          <p>{school.overview_paragraph} </p>
        </section>
      </div>

      <ul>
        {schools && schools.length > 0
          ? schools.map((s) => (
              <li key={s.dbn}>
                <a href="#" onClick={() => handleSchool(s.dbn)}>
                  {" "}
                  <span> {s.school_name} , </span> <span> {s.dbn}</span>
                </a>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
