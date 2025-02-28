import { Alert, Button, Flex, FlexItem, Popover, Stack, StackItem } from '@patternfly/react-core';
import * as React from 'react';
import { NodePoolK8sResource } from '../types';
import { AgentK8sResource } from '../../../types';
import { getNodePoolStatus } from '../utils';
import { useTranslation } from '../../../../common/hooks/use-translation-wrapper';
import ConditionsTable from './ConditionsTable';

type NodePoolStatusProps = {
  nodePool: NodePoolK8sResource;
  agents: AgentK8sResource[];
};

const NodePoolStatus = ({ nodePool, agents }: NodePoolStatusProps) => {
  const { t } = useTranslation();
  const status = getNodePoolStatus(nodePool, agents, t);
  return (
    <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsXs' }}>
      <FlexItem>{status.icon}</FlexItem>
      <FlexItem>
        <Popover
          aria-label="node pool status"
          headerContent={<div>{t('ai:Nodepool conditions')}</div>}
          hasAutoWidth
          showClose={false}
          bodyContent={
            <Stack hasGutter>
              {status.type === 'error' && (
                <StackItem>
                  <Alert
                    variant="danger"
                    isInline
                    title={t('ai:Some hosts are in an error state.')}
                  />
                </StackItem>
              )}
              {status.type === 'warning' && (
                <StackItem>
                  <Alert
                    variant="warning"
                    isInline
                    title={t('ai:Some hosts are in a warning state.')}
                  />
                </StackItem>
              )}
              <StackItem>
                <ConditionsTable conditions={nodePool.status?.conditions} />
              </StackItem>
            </Stack>
          }
        >
          <Button variant="link" isInline>
            {status.text}
          </Button>
        </Popover>
      </FlexItem>
    </Flex>
  );
};

export default NodePoolStatus;
