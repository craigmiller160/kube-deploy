#!/usr/bin/env node

import execute from './execution';

const status = execute();
process.exit(status);
