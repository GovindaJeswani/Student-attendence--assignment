import { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import StudentEntry from './components/StudentEntry';
import { AppContext } from './context';
import { initialData } from './student';

function App() {
  const [StudentList, setStudentList] = useState(initialData);

  const dispatchEntryEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD_ENTRY':
        setStudentList([...StudentList, payload.newEntry]);
        return;
      case 'UPDATE_ENTRY':
        setStudentList(
          StudentList.map((student) =>
            student.number === payload.number
              ? Object.assign({}, student, {
                  checkOutTime: payload.checkOutTime,
                })
              : student
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <div>
      <AppContext.Provider value={{ StudentList, dispatchEntryEvent }}>
        <Navbar />
        <StudentEntryWrapper>
          {StudentList.map(
            ({ ROll, StudentName, checkInTime, checkOutTime }, index) => (
              <StudentEntry
                key={index}
                number={ROll}
                StudentName={StudentName}
                checkInTime={checkInTime}
                checkOutTime={checkOutTime}
              />
            )
          )}
        </StudentEntryWrapper>
      </AppContext.Provider>
    </div>
  );
}

export default App;

const StudentEntryWrapper = styled.div`
  margin: 20px;
  margin-top: 14vh;
  display: grid;
  gap: 30px;
  text-align: center;
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
