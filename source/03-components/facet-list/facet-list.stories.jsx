import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import listTemplate from './facet-list.twig';
import facetTemplate from '../facet/facet.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './facet-list.yml';
import './facet-list.scss';
import '../facet/facet.scss';

const settings = {
  title: 'Components/Facets/Facet List',
  decorators: [withGlobalWrapper],
  argTypes: {
    list_type: {
      options: ['ul', 'ol'],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: ['modifier_classes', 'show_count', 'list_type', 'empty'],
    },
  },
};

const FacetList = {
  render: args => {
    const facets = (args.facets_data || data.facets_data)
      .map(item => {
        // Render the child facets if there are any.
        if (item.children) {
          const childFacets = (item.children)
            .map(child => {
              return {
                value: facetTemplate(
                  { ...args, ...child, modifier_classes: 'c-facet--secondary' }
                ),
              };
            });
          const childList = listTemplate({
            facets: childFacets,
            ...args,

          });

          return {
            value: `${facetTemplate({ ...args, ...item })} ${childList}`,
            is_expanded: true,
          };
        }

        return {
          value: facetTemplate({ ...args, ...item }),
          is_expanded: false,
        };
      });

    return parse(
      listTemplate({
        facets,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

export default settings;
export { FacetList };
