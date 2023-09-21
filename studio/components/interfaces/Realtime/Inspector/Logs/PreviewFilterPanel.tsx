import { Label } from '@ui/components/shadcn/ui/label'
import { FormActions } from 'components/ui/Forms'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  Button,
  Form,
  Input,
  PopoverContent_Shadcn_,
  PopoverTrigger_Shadcn_,
  Popover_Shadcn_,
  Switch,
} from 'ui'
import RealtimeConfigModal from './RealtimeConfigModal'
import { UseRealtimeLogsPreviewParams } from './useRealtimeLogsPreviewer'

interface PreviewFilterPanelProps {
  condensedLayout: Boolean
  config: UseRealtimeLogsPreviewParams
  onSetConfig: Dispatch<SetStateAction<UseRealtimeLogsPreviewParams>>
}

/**
 * Logs control panel header + wrapper
 */
const PreviewFilterPanel = ({ condensedLayout, config, onSetConfig }: PreviewFilterPanelProps) => {
  const [open, setOpen] = useState(false)
  const [isModalShown, setModalShown] = useState(false)

  return (
    <div
      className={'flex w-full items-center justify-between' + (condensedLayout ? ' px-5 pt-4' : '')}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row gap-4 items-center">
          <Switch
            id="realtime-enabled"
            checked={config.enabled}
            onCheckedChange={() => onSetConfig({ ...config, enabled: !config.enabled })}
          />
          <Label htmlFor="realtime-enabled">Realtime</Label>
          <Button onClick={() => setModalShown(true)}>Set config</Button>
        </div>
        <Popover_Shadcn_ open={open} onOpenChange={setOpen}>
          <PopoverTrigger_Shadcn_>
            <Button>Send an event</Button>
          </PopoverTrigger_Shadcn_>
          <PopoverContent_Shadcn_>
            <Form
              onSubmit={() => {}}
              initialValues={{ EVENT_NAME: '', EVENT_PAYLOAD: '' }}
              className="flex flex-col gap-2"
            >
              {({ resetForm }: any) => {
                return (
                  <>
                    <Input
                      name="EVENT_NAME"
                      id="EVENT_NAME"
                      label="Event"
                      size="tiny"
                      descriptionText="Event name"
                      placeholder="test"
                    />
                    <Input
                      name="EVENT_PAYLOAD"
                      id="EVENT_PAYLOAD"
                      label="Payload"
                      size="tiny"
                      descriptionText="Message payload (in JSON)"
                      placeholder={`{"some":"data"}`}
                    />
                    <div className="pt-4">
                      <FormActions
                        handleReset={() => {
                          resetForm({
                            values: { EVENT_NAME: '', EVENT_PAYLOAD: '' },
                          })
                        }}
                        form="submit-realtime-event"
                        // isSubmitting={isUpdatingConfig}
                        hasChanges={true}
                        // disabled={!canUpdateConfig}
                      />
                    </div>
                  </>
                )
              }}
            </Form>
          </PopoverContent_Shadcn_>
        </Popover_Shadcn_>
      </div>
      <RealtimeConfigModal
        visible={isModalShown}
        onClose={() => setModalShown(false)}
        connectionConfig={config}
        setConnectionConfig={onSetConfig}
      />
    </div>
  )
}

export default PreviewFilterPanel
