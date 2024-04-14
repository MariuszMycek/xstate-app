import { steps } from '@/data';
import { MachineReactContext } from '@/machines/machine';
import { Step, StepButton } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

const SkippedInfo = () => {
  return <Typography variant="caption">Skipped</Typography>;
};

export const CheckoutStepper = () => {
  const completedStep = MachineReactContext.useSelector(state => state.context.completedStep);
  const skippedSteps = MachineReactContext.useSelector(state => state.context.skippedSteps);
  const activeStep = MachineReactContext.useSelector(state => state.context.activeStep);
  const isCompleted = MachineReactContext.useSelector(state => state.hasTag('completed'));
  const actorRef = MachineReactContext.useActorRef();

  return (
    <>
      <Box sx={{ width: '100%' }} component="section">
        <Stepper activeStep={activeStep.step} nonLinear>
          {steps.map(stepData => {
            const skipped = skippedSteps.includes(stepData.step);
            const completed = !skipped && completedStep !== null && completedStep >= stepData.step;
            const disabled = completedStep === null || completedStep + 1 < stepData.step || skipped;

            return (
              <Step key={stepData.view} completed={completed} disabled={disabled}>
                <StepButton
                  color="inherit"
                  onClick={() => actorRef.send({ type: 'change_view', view: stepData.view })}
                  optional={skipped && <SkippedInfo />}
                >
                  {stepData.name}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box component="header">
        <Typography sx={{ mt: 3, mb: 1 }}>
          {!isCompleted ? (
            <>
              Step {activeStep.step + 1}
              {activeStep.name && (
                <>
                  {' - '}
                  <Typography component="span" fontWeight={500}>
                    {activeStep.name}
                  </Typography>
                </>
              )}
            </>
          ) : (
            'Completed'
          )}
        </Typography>
      </Box>
    </>
  );
};

export default CheckoutStepper;
