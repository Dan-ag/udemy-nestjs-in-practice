
import * as moongose from 'mongoose';

export const CoursesSchema = new moongose.Schema( {
  seqNo: {
    type: Number,
    required: true
  },
  ulr: String,
  iconUrl: String,
  courseListIcon: String,
  description: String,
  longDescription: String,
  category: String,
  lessonsCount: Number,
  promo: Boolean,
} );


