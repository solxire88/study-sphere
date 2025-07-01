from rest_framework import serializers
from .models import Test, Question, AnswerOption

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ['id', 'text', 'is_correct']
        # extra_kwargs = {'is_correct': {'write_only': True}}  # Optionally hide is_correct from students


class QuestionSerializer(serializers.ModelSerializer):
    answer_options = AnswerOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'order', 'answer_options']

    def create(self, validated_data):
        answer_data = validated_data.pop('answer_options')
        question = Question.objects.create(**validated_data)
        for ans_data in answer_data:
            AnswerOption.objects.create(question=question, **ans_data)
        return question


class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Test
        fields = ['id', 'title', 'description', 'class_obj', 'created_by', 'created_at', 'questions']
        read_only_fields = ['created_by', 'created_at']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        test = Test.objects.create(**validated_data)
        for question_data in questions_data:
            answer_options_data = question_data.pop('answer_options')
            question = Question.objects.create(test=test, **question_data)
            for option_data in answer_options_data:
                AnswerOption.objects.create(question=question, **option_data)
        return test
