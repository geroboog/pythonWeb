from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
import tensorflow as tf
import time
import data_helpers

beginTime = time.time()
# Parameter definitions

batch_size = 100
learning_rate = 0.005
max_steps = 1000

# Prepare data
data_sets = data_helpers.load_data()