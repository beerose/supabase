import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { useSchemasQuery } from 'data/database/schemas-query'
import { useEntityTypesQuery } from 'data/entity-types/entity-types-infinite-query'
import { EXCLUDED_SCHEMAS } from 'lib/constants/schemas'
import { partition } from 'lodash'
import { IconLock, Listbox } from 'ui'

interface SchemasListBoxProps {
  selectedSchemaName: string
  value: string
  onChange: (value: string) => void
  isLocked: boolean
}

export const TablesListbox = ({
  selectedSchemaName,
  value,
  onChange,
  isLocked,
}: SchemasListBoxProps) => {
  const { project } = useProjectContext()

  const { data: schemas } = useSchemasQuery({
    projectRef: project?.ref,
    connectionString: project?.connectionString,
  })
  const [protectedSchemas, openSchemas] = partition(schemas ?? [], (schema) =>
    EXCLUDED_SCHEMAS.includes(schema?.name ?? '')
  )

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPreviousData: isSearching,
  } = useEntityTypesQuery(
    {
      projectRef: project?.ref,
      connectionString: project?.connectionString,
      schema: selectedSchemaName,
    },
    {
      keepPreviousData: true,
    }
  )
  console.log(data?.pages[0].data.count)

  if (isLoading) {
    return <></>
  }

  return (
    <div className="w-[260px]">
      <Listbox
        size="small"
        value={value}
        onChange={onChange}
        icon={isLocked && <IconLock size={14} strokeWidth={2} />}
      >
        {data?.pages[0].data.count &&
          data?.pages[0].data.count > 0 &&
          data?.pages[0].data.entities.map((p) => {
            return (
              <Listbox.Option
                key={p.name}
                value={p.name}
                label={p.name}
                addOnBefore={() => <span className="text-scale-900">table</span>}
              >
                <span className="text-scale-1200 text-sm">{p.name}</span>
              </Listbox.Option>
            )
          })}
      </Listbox>
    </div>
  )
}
