import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context';

const Dropdown = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [numOfPresentStudents, setNumOfPresentStudents] = useState(0);
  const [numOfTotalStudents, setNumOfTotalStudents] = useState(0);
  const [numOfAbsentStudents, setNumOfAbsentStudents] = useState(0);
  const { StudentList } = useContext(AppContext);
  useEffect(() => {
    setNumOfPresentStudents(
      StudentList.filter((student) => !student.checkOutTime).length
    );
    setNumOfTotalStudents(StudentList.length);
    setNumOfAbsentStudents(
      StudentList.filter((student) => !!student.checkOutTime).length
    );
  }, [StudentList]);

  const optionsList = [
    `Present Students: ${numOfPresentStudents}`,
    `Total Students: ${numOfTotalStudents}`,
    `Absent students: ${numOfAbsentStudents}`,
  ];

  const toggleOptions = () => {
    setIsOptionsOpen((p) => !p);
  };
  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
  };
  return (
    <Wrapper>
      <Container>
        <MainButton
          type='button'
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? 'expanded' : ''}
          onClick={toggleOptions}
        >
          {optionsList[selectedOption]}
          <img src='assets/down-arrow.svg' alt='' />
        </MainButton>
        <OptionsList
          className={`options ${isOptionsOpen ? 'show' : ''}`}
          tabIndex={-1}
        >
          {optionsList.map((option, index) => (
            <li
              key={index}
              id={option}
              role='option'
              aria-selected={selectedOption === index}
              tabIndex={0}
              onClick={() => {
                setSelectedThenCloseDropdown(index);
              }}
            >
              {option}
            </li>
          ))}
        </OptionsList>
      </Container>
    </Wrapper>
  );
};

export default Dropdown;

const Wrapper = styled.div`
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.2s;
  overflow: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  z-index: 22;
  &:hover {
    translate: 0 -1px;
    background-color: #255d8f;
  }
  &:active {
    translate: 0 5px;
    z-index: 22;
  }
  @media screen and (max-width: 800px) {
    max-width: calc(200px + 10vw);
  }
`;

const Container = styled.div`
  width: 320px;
`;

const MainButton = styled.button`
  border: 0;
  background: transparent;
  color: white;
  width: 100%;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  position: relative;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
  & > img {
    height: 24px;
    position: absolute;
    right: 6px;
    top: 4px;
    transition: 0.2s;
  }
  &.expanded > img {
    rotate: 180deg;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  background: #fff;
  color: #2c679d;
  z-index: 22;
  &.options {
    border: 1px solid white;
    border-radius: 10px;
    display: none;
    list-style: none;
    padding: 4px 0;
    margin-top: 10px;
    width: 100%;
  }
  &.show {
    display: block;
  }
  &.options li {
    padding: 6px 10px;
  }

  &.options li:active,
  &.options li:focus,
  &.options li:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 22;
  }
`;