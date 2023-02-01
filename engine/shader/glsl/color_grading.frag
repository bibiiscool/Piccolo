#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

#define CELLS_PER_ROW 8.0
#define CELLS_PER_COLUM 8.0

void main()
{
    // 以下是使用横向lut图的代码
    // highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    // highp float _COLORS      = float(lut_tex_size.y);

    // highp vec4 color       = subpassLoad(in_color).rgba;
    
    // // 图序号
    // int index = int(color.b*_COLORS);
    // // 图起始位置
    // highp float start = float(index)/_COLORS;
    // // u
    // highp float u1 = start + color.r/_COLORS;

    // // 图序号
    // highp float index2 = ceil(color.b*_COLORS);
    // // 图起始位置
    // highp float start2 = float(index2)/_COLORS;
    // // u
    // highp float u2 = start2 + color.r/_COLORS;

    // highp float v = color.g;

    // highp vec2 uv1 = vec2(u1, v);
    // highp vec4 sampled_lut1 = texture(color_grading_lut_texture_sampler, uv1);

    // highp vec2 uv2 = vec2(u2, v);
    // highp vec4 sampled_lut2 = texture(color_grading_lut_texture_sampler, uv2);

    // highp float lerp =    color.b*_COLORS- floor(color.b*_COLORS);
    // highp vec4 sampled_lut = mix(sampled_lut1, sampled_lut2, lerp);

    // out_color = sampled_lut;

    // 以下是使用纵向lut图的代码
    highp float _COLORS      = 64.0;

    highp vec4 color       = subpassLoad(in_color).rgba;
    
    // 图序号
    int index = int(color.b*_COLORS);
    // 图起始位置
    highp float  row = float(index/8);
    highp float  colum = float(index)-row*8.0;

    highp float u1 = float(colum)/8.0 + color.r/8.0;
    highp float v1 = float(row)/8.0 + color.g/8.0;
    highp vec2 uv1 = vec2(u1, v1);
    highp vec4 sampled_lut1 = texture(color_grading_lut_texture_sampler, uv1);

    out_color = sampled_lut1;
}


