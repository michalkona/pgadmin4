/////////////////////////////////////////////////////////////
//
// pgAdmin 4 - PostgreSQL Tools
//
// Copyright (C) 2013 - 2022, The pgAdmin Development Team
// This software is released under the PostgreSQL Licence
//
//////////////////////////////////////////////////////////////

import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import pgAdmin from 'sources/pgadmin';
import {messages} from '../fake_messages';
import SchemaView from '../../../pgadmin/static/js/SchemaView';
import BaseUISchema from 'sources/SchemaView/base_schema.ui';
import RoleSchema from '../../../pgadmin/browser/server_groups/servers/roles/static/js/role.ui';


class MockSchema extends BaseUISchema {
  get baseFields() {
    return [];
  }
}

describe('RoleSchema', ()=>{
  let mount;
  let schemaObj = new RoleSchema(
    ()=>new MockSchema(),
    ()=>new MockSchema(),
    {
      role: ()=>[],
      nodeInfo: {server: {user: {name:'postgres', id:0}}}
    },
  );
  let getInitData = ()=>Promise.resolve({});

  /* Use createMount so that material ui components gets the required context */
  /* https://material-ui.com/guides/testing/#api */
  beforeAll(()=>{
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(()=>{
    jasmineEnzyme();
    /* messages used by validators */
    pgAdmin.Browser = pgAdmin.Browser || {};
    pgAdmin.Browser.messages = pgAdmin.Browser.messages || messages;
    pgAdmin.Browser.utils = pgAdmin.Browser.utils || {};
  });

  it('create', ()=>{
    mount(<SchemaView
      formType='dialog'
      schema={schemaObj}
      viewHelperProps={{
        mode: 'create',
      }}
      onSave={()=>{}}
      onClose={()=>{}}
      onHelp={()=>{}}
      onEdit={()=>{}}
      onDataChange={()=>{}}
      confirmOnCloseReset={false}
      hasSQL={false}
      disableSqlHelp={false}
    />);
  });

  it('edit', ()=>{
    mount(<SchemaView
      formType='dialog'
      schema={schemaObj}
      getInitData={getInitData}
      viewHelperProps={{
        mode: 'edit',
      }}
      onSave={()=>{}}
      onClose={()=>{}}
      onHelp={()=>{}}
      onEdit={()=>{}}
      onDataChange={()=>{}}
      confirmOnCloseReset={false}
      hasSQL={false}
      disableSqlHelp={false}
    />);
  });

  it('properties', ()=>{
    mount(<SchemaView
      formType='tab'
      schema={schemaObj}
      getInitData={getInitData}
      viewHelperProps={{
        mode: 'properties',
      }}
      onHelp={()=>{}}
      onEdit={()=>{}}
    />);
  });
});

