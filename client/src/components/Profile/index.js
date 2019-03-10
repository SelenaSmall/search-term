import React from 'react';
import {
 Badge, Col, Row, Progress 
} from 'reactstrap';
import styled from 'styled-components';

const StepContainer = styled.div`
  width: 100%;
  display: flex;
  &:after {
    content: '';
    position: relative;
    flex: 1;
    margin: 0.8rem 0 0 2rem;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const BadgeContainer = styled.span`
  margin-right: 0.5em;
`;
const StepSpan = styled.span`
  margin-top: 0.1em;
`;

const Step = ({ number, done, name }) => (
  <Col>
    <StepContainer data-test-id={`step-${number}`}>
      <BadgeContainer>
        <Badge color={done ? 'primary' : 'secondary'} pill>
          {number}
        </Badge>
      </BadgeContainer>
      <StepSpan>{name}</StepSpan>
    </StepContainer>
  </Col>
);

export default () => (
  <>
    <Row data-test-id="profile-steps">
      <Step number="1" done name="Id" />
      <Step number="2" name="Alias" />
      <Step number="3" name="Email" />
      <Step number="4" name="Avatar" />
      <Step number="5" name="Confirmation" />
    </Row>
    <Row>
      <Col>
        <Progress value="20" />
      </Col>
    </Row>
  </>
);
